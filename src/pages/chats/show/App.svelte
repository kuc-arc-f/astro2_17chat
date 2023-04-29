<script lang="ts">
import LibConfig from '../../../lib/LibConfig';
import LibAuth from '../../../lib/LibAuth';
import LibCommon from '../../../lib/LibCommon';
import LibChatPost from '../../../lib/LibChatPost';
import LibTimer from '../../../lib/LibTimer';
import LibNotify from '../../../lib/LibNotify';
import LibCookie from '../../../lib/LibCookie';
import ChatPost from '../ChatPost';
import ModalPost from './ModalPost.svelte';
const postCfg= LibChatPost.get_params()
const chatParams = {
  INIT_TIME : new Date(),
  STAT : postCfg.STATE_ACTIVE,
  STAT_DISPLAY : postCfg.STATE_DISPLAY_ACTIVE,
  REMAIN_TIME : 0,
}

export let id: number = 0;
let data: any, chat_posts: any[] = [], DATA = chatParams,
post_id = 0, modal_display = false, mTimeoutId: any = 0, user:any = {}, lastCreateTime: string = "";

//let item = {};
console.log("show/App.svelte.id=", id);
/**
* init proc
* @param
*
* @return
*/
const startProc= async function() {
    const items = await ChatPost.getList(id);
    chat_posts = items;
//console.log(items);
}
startProc();
LibNotify.validNotification();
//
const deleteItem = async function() {
}
/**
* addItem
* @param
*
* @return
*/
async function addItem(){
    try {
        const result = await ChatPost.addItem(id);
console.log(result);
        const items = await ChatPost.getList(id);
        chat_posts = items;
        //@ts-ignore
        lastCreateTime = result.createdAt;
    } catch (error) {
        console.error(error);
    }    
}
/**
 * parentShow
 * @param
 *
 * @return
 */
 const parentShow = function (id: number)
{
    try {
        console.log("parentShow=", id)
        post_id = id;
        modal_display = false;
        const timer = 100;
        setTimeout(() => {
            console.log("parentShow=", id);
            modal_display = true;
            const btn = document.getElementById("open_post_show");
            btn?.click();
        }
        , timer);
    } catch (e) {
        console.log(e);
    }
}
/**
 * parentGetList
 * @param
 *
 * @return
 */
 const parentGetList = async function (id: number) {
    try {
        const items = await ChatPost.getList(Number(data.id));
        chat_posts = items;
    } catch (e) {
        console.error(e);
    }    
}
</script>
<!-- MarkUp -->
<div class="container my-2">
    <h1>{id}</h1>
    ID: {id}    
    <hr class="my-1" />
    <div class="row">
        <div class="col-sm-9">
        <textarea class="form-control" name="body" id="body" rows="3" />
        </div>
        <div class="col-sm-3">
            <button class="mt-2 btn btn-primary" on:click={addItem} >
            Post</button>
        </div>
    </div>
    {#each chat_posts as item}
    <div>
        <h5>{item.UserName}</h5>
        <hr class="my-1" />
        <p>{@html LibCommon.replaceBrString(item.body)}</p>
        <p>{LibCommon.converDateString(item.createdAt)}, ID: {item.id}
        </p>
        <button on:click={parentShow(item.id)}
        class="btn btn-sm btn-outline-primary">Show</button>        
        <hr />
    </div>
    {/each}
    <!-- Modal -->
    <div class="chat_show_modal_wrap">
        <button type="button" class="btn btn-primary" id="open_post_show"
        data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal
       </button>
        <div class="modal fade" id="exampleModal" tabindex="-1"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    {#if modal_display}
                    <ModalPost post_id={post_id} parentGetList={parentGetList} />
                    {/if}
                </div>
            </div>
        </div>    
    </div>
</div>
<!-- CSS -->
<style>
.chat_show_modal_wrap #open_post_show { display: none ;}
</style>
