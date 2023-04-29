import LibConfig from './LibConfig';
//import Session from './Session';
import LibAuth from './LibAuth';
//
const Layout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
//console.log("#Layout.startProc");
    let ret = false;
    const parsedUrl = new URL(window.location.href);
    if(!(parsedUrl.pathname === '/login' || parsedUrl.pathname === '/basic_login')) 
    {
//console.log("pathname=", parsedUrl.pathname);
      const validLogin: boolean = await LibAuth.validLogin();
      if(validLogin === false) {
//        alert("validLogin");
        location.href = '/login';
        return;
      }
    }
    return ret;
  }
}
Layout.startProc();

export default Layout;
