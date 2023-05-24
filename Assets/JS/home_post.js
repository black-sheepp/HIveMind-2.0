

{
    // method to submit the form data for new post via ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
 
            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data)
                    let newPost = newPostDOM(data.data.post)
                    $('#post-list-container').prepend(newPost)
                    deletePost($(' .delete-post-btn', newPost))
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

            $('#form-text-area').val('');
        })
    }

    // method to create the post in dom
    let newPostDOM = function(post){
        return $(`
        
        <div id="post-${ post._id }">
        <div  class="container mx-0 px-0 my-4" width="50%" style="border: 2px solid black; border-radius: 10px">
             <div class="post-card my-2">
                  <img
                       src="${ post.user.avatar }"
                       class="rounded float-start"
                       alt="..."
                       width="40px"
                       height="40px"
                       style="margin: 10px"
                  />
                  <div style="margin: 0; padding: 0">
                       <p style="margin: 0px; margin-top: 6px">
                            <strong> ${ post.user.firstName } ${ post.user.lastName } </strong>
        
                            <a href="/post/destroy/${ post._id }" class="delete-post-btn"
                                 ><i class="fa-solid fa-trash-can" style="color: #132a13"></i
                            ></a>
                       </p>
                       <small>
                            <a href="" style="text-decoration: none; color: #132a13"
                                 ><i class="fa-regular fa-thumbs-up fa-xl"></i
                            ></a>
                            Likes</small
                       >
                  </div>
             </div>
             <p style="margin-bottom: 6px; margin-left: 50px; padding-right: 25px">
                  <strong>
                       <i class="fa-solid fa-angles-right" style="color: #37ff8b"></i>
                       ${ post.content }
                       <!-- <i class="fa-solid fa-quote-right" style="padding-left: 20px;"></i> -->
                  </strong>
             </p>

             <form action="/comment/create" method="post">
                  <div class="input-group mb-1">
                       <input
                            name="content"
                            type="text"
                            class="form-control"
                            placeholder="Add Comment"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            style="margin-left: 50px; margin-right: 0"
                            required
                       />
                       <input type="hidden" name="post" value="${ post._id }" />
                       <button class="btn btn-outline-dark" type="submit" id="button-addon2" style="margin-right: 30px">
                            Comment
                       </button>
                  </div>
             </form>
        
             <ul id="post-comments-${ post._id }">
                  
             </ul>
        </div>
        </div>
        
        `)
    } 



     //method to delete a post from dom
    let deletePost = function(deleteLink){
     $(deleteLink).click(function(e){
          e.preventDefault();

          $.ajax({
               type: 'get',
               url: $(deleteLink).prop('href'),
               success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
               },
               error: function(error){
                    console.log(error.responseText)
               },
          })
     })
    }

    createPost();
}