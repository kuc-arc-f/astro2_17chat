import LibDbSession from '../../lib/LibDbSession';
import LibConfig from '../../lib/LibConfig';
import LibAuth from '../../lib/LibAuth';
//
const ChatPost = {
  /**
  * addItem
  * @param
  *
  * @return
  */
  addItem: async function(id: number)
  {
    try {
      let ret = {};
      const user = await LibAuth.getUser()
      if(user === null) {
          console.error("addPost, user nothing");
          throw new Error('Error , user nothing');
      }
//console.log(user);
//return;
      const elemBody = document.querySelector<HTMLInputElement>('#body');
      const item = {
        title: '',
        chatId: Number(id),
        body: elemBody?.value,
        userId : Number(user.id),
      }
      console.log(item);
      const url = import.meta.env.PUBLIC_API_URL + '/chat_posts/create';
      const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',},
          body: JSON.stringify(item),
      });
      if (res.status != 200) {
          throw new Error(await res.text());
      }
      //@ts-ignore
      elemBody.value = "";
      const resJson = await res.json();
  console.log(resJson.data)
      ret = resJson.data;
      return ret;
    } catch (error) {
        console.error(error);
    }    
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */ 
  getList: async function(chatId: number): Promise<any>
  {
    try {
        let items = [];
        const item = {
          chatId: chatId,
          userId : 0,
        }
        const url = import.meta.env.PUBLIC_API_URL + "/chat_posts/index";
        const body = JSON.stringify(item);
        const res = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},      
          body: body
        });
        const json = await res.json()  
        items = json.data
//console.log(items);	      
        await LibDbSession.set(LibConfig.SESSION_KEY_CHAT_POST, items);
      return items;
    } catch (e) {
      console.error(e);
    }
  },
  /**
  * getLastTime
  * @param chatId: number
  *
  * @return Promise
  */      
  getLastTime : async function (chatId: number, userId: number): Promise<any>
  {
    try {
      let ret = {};
      const item = {
        chatId: chatId,
        userId: userId,
      }
      const res = await fetch(import.meta.env.PUBLIC_API_URL + '/chat_posts/get_last_time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(item),
      });
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      const json = await res.json();
      if(json.ret === LibConfig.OK_CODE) {
//console.log(json.data);
        ret = json.data;
      }
      return ret;       
    } catch (e) {
      console.log(e);
      throw new Error('error, getLastTime');
    }
   },
}
export default ChatPost;
