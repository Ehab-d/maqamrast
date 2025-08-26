// راوتر بسيط يعتمد على hash
window.Router = (() => {
  const routes = new Map();

  function add(path, handler){
    routes.set(path, handler);
  }

  function parse(){
    const hash = location.hash || '#/';
    const [path, query] = hash.split('?');
    return { path, params: new URLSearchParams(query || '') };
  }

  async function render(){
    const { path, params } = parse();
    const app = document.getElementById('app');
    const match = [...routes.keys()].find(route => {
      if(route.includes(':')){
        const base = route.split('/:')[0];
        return path.startsWith(base + '/');
      }
      return route === path;
    });

    if(!match){
      return routes.get('#/404')?.(app, { params, path });
    }

    if(match.includes(':')){
      const key = path.split('/').pop();
      return routes.get(match)?.(app, { key, params, path });
    }

    return routes.get(match)?.(app, { params, path });
  }

  function start(){
    window.addEventListener('hashchange', render);
    render();
  }

  return { add, start };
})();

