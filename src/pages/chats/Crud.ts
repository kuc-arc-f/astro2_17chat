//
interface Todo {
  title: string;
  content: string;
}

//
const Crud = {
  /**
   * :
   * @param key: any
   *
   * @return
   */ 
  validateTodo: function(todo: any): boolean
  {
    try {
      const { name, content } = todo;
      if (name === null || content === null) {
        return false;
      }
//      if (title.length === 0 || content.length === 0) {
      if (name.length === 0) {
        return false;
      }      
      //      
      if (name.length > 100) {
        return false;
      }
      if (content.length > 200) {
        return false;
      }
      return true;      
    } catch (e) {
      console.error(e);
    }
  },  
  /**
   * :
   * @param key: any
   *
   * @return
   */   
  getTodoDataFromInput: function(): any
  {
    try{
      const titleInput = document.querySelector<HTMLInputElement>('#name'); // titleのINPUTタグを取得
      const contentInput = document.querySelector<HTMLInputElement>('#content'); // contentのINPUTタグを取得
//      const user_id = 0
      const name = titleInput?.value || '';
      const content = contentInput?.value || '';
    
      return {
        name,
        content,
//        completed
      };      
    } catch (e) {
      console.error(e);
      throw new Error('Error , getTodoDataFromInput');
    }
  },  
  /**
   * 
   * @param key: any
   *
   * @return
   */
  getInputValues: function() : any
  {
    try{
      const data: any = {};
  
      // inputタグから値を取得し、オブジェクトにセットする
      const title = (<HTMLInputElement>document.querySelector("#title")).value;
      data.title = title;
      
      const content = (<HTMLInputElement>document.querySelector("#content")).value;
      data.content = content;
      
      const priority = (<HTMLInputElement>document.querySelector("#priority")).value;
      data.priority = parseInt(priority);
      
//      const category_id = (<HTMLInputElement>document.querySelector("#category_id")).value;
//      data.category_id = parseInt(category_id);
      
      const completed = (<HTMLInputElement>document.querySelector("#completed")).checked;
      data.completed = completed ? 1 : 0;
      
      const tag_1 = (<HTMLInputElement>document.querySelector("#tag_1")).value;
      data.tag_1 = tag_1;
      
      const tag_2 = (<HTMLInputElement>document.querySelector("#tag_2")).value;
      data.tag_2 = tag_2;
      
      const tag_3 = (<HTMLInputElement>document.querySelector("#tag_3")).value;
      data.tag_3 = tag_3;
      
      const tag_4 = (<HTMLInputElement>document.querySelector("#tag_4")).value;
      data.tag_4 = tag_4;
      
      const tag_5 = (<HTMLInputElement>document.querySelector("#tag_5")).value;
      data.tag_5 = tag_5;
    
      return data;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getInputValues');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
/*
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      const valid = await LibCrud.validLogin();
      if(valid === false) {
      }
    } catch (e) {
      console.error(e);
    }    
  } 
*/
}
//Crud.startProc();

export default Crud;
