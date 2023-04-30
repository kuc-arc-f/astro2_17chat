//import LibCrud from '../../lib/LibCrud';
//import LibConfig from '../../lib/LibConfig';
//import Crud from './Crud';
// 
const CrudCreate = {

  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
      console.log("url=", url);
      const name = document.querySelector<HTMLInputElement>('#name');
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      const item = {
        name: name?.value,
        email: email?.value,
        password: password?.value,
      }
//console.log(item);
      const body = JSON.stringify(item);		
//return;
      const res = await fetch(url + "/users/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      } 
      ret = true;
      return ret;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      /*
      const valid = await LibCrud.validLogin();
      if(valid === false) {
      }
      */
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.addItem();
console.log("result=", result);
        if(result) {
          window.location.href = '/login';
        }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
CrudCreate.startProc();

export default CrudCreate;
