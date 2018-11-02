$(document).ready(function(){

    $('#username').keyup(function(e){
       username =  e.target.value;

    $.ajax({ // ajax call to github api 
        url: 'https://api.github.com/users/'+username,
        // Returns JSON data about users
        data:{
            client_id : '<git-hub-client-id>',
            client_secret : '<git-hub-client-secret>'
        }
        }).done(function(userData){ // After completing first call, second ajax call
            $.ajax({
                url: 'https://api.github.com/users/'+username+'/repos',
                // Returns JSON data about repositories
                data:{
                    client_id : '41cf170640bd25f36a45',
                    client_secret : 'dfa2607d39734a6c841211f134056f3491c1891c',
                    sort: 'created: asc',
                    per_page: 5
                    } // client_id and client_secret generated from github OAuth
                }).done(function(repos){
                    $('#repos').html(''); // Removing The html
                    $.each(repos, function(key, repo){
                        // We are using ' template literals' for appending multiline HTML
                        $('#repos').append(`
                            <div class = "well">
                            <div class="row">
                              <div class = "col-md-10">
                              <strong>${repo.name}: </strong>${repo.description}
                              </div>
                              <div class = "col-md-1">
                              <button class="btn btn-info btn-xs">Forks: ${repo.forks_count}</button>
                              </div>
                              <div class = "col-md-1">
                              <a href="${repo.html_url}" target="_blank" class="btn btn-success btn-xs">Visit</a>
                              </div>
                            </div>
                            </div>
                        `)
                    });
            });

            $('#searchResult').html(`
            <div class="panel panel-default" style="margin-top:10px;">
                <div class="panel-heading">
                    <h4 class='text-danger'>${userData.name}</h4>
                </div>
                <div class="panel panel-body">
                    <div class="col-md-2">
                    <img class="thumbnail" src="${userData.avatar_url}" alt="Profile Photo" style=" max-width:100%; text-align:center;">   
                    <a href="${userData.html_url}" target="_blank" class="btn btn-primary" style="min-width:100%">View Profile</a>
                    </div>
                    <div class="col-md-10">
                        <div class="list-group" style="max-width:100%">
                            <a href="#" class="list-group-item">
                                <span class="label label-danger">Public repositories: ${userData.public_repos}</span>
                                <span class="label label-info">Following: ${userData.following}</span>
                                <span class="label label-success">Followers: ${userData.followers}</span>
                                <span class="label label-default">Public Gists: ${userData.public_gists}</span>
                            </a>
                            <p href="#" class="list-group-item">Company: ${userData.company}</p>
                            <p href="#" class="list-group-item">Location: ${userData.location}</p>
                            <a href="${userData.blog}" class="list-group-item" target="_blank">Blog: ${userData.blog}</a>
                            
                        </div>
                    </div> 
                </div>
            </div>
            <div><h3 class="page-header">Latest Repositories</h3></div>
            <div id="repos"></div>

            `);
        }); 
    });
});
