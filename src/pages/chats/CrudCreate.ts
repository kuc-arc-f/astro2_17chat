import LibCrud from '../../lib/LibCrud';
import Crud from './Crud';
//
interface Todo {
  title: string;
  content: string;
}

//
const CrudCreate = {
  
  /**
   * :
   * @param key: any
   *
   * @return
   */   
  create: async function(): Promise<any>
  {
    try {
//  console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL + "/chats/create";
      const item = Crud.getTodoDataFromInput();
console.log(item);
      const valid = Crud.validateTodo(item);
      if(!valid) {
        console.log("valid=", valid);
        alert("Error, input value");
        return false;
      }
      item.userId = 0;
//return;
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
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
      const valid = await LibCrud.validLogin();
//console.log("valid=", valid);
      if(valid === false) {
//        alert("NG, valid Login");
      }
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.create();
        console.log("result=", result);
        if(result) {
          window.location.href = '/chats';
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
