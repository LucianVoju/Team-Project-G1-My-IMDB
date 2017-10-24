import {loginUser, isLoggedIn,getAuthToken} from "./userController";

    const url = "https://ancient-caverns-16784.herokuapp.com/movies";

    function setupEventListeners() {
        console.log("I am not dead!");
        $('#add-form').on('submit', function(e) {
            e.preventDefault(); //prevent form from submitting
            var data = $("#add-form :input").serializeArray();
            var emptyInputs = data.filter(e => e.value == "");
            if (!emptyInputs.length == 0) {
                alert("Can't submit form with empty fields");
                return;
            }

            var json = data.reduce((json, currentInput) => {
                json[currentInput.name] = currentInput.value;
                return json;
            }, {});
            
            console.log(data);
            console.log(json);
            if (isLoggedIn()) {
                jQuery.ajax({
                        url: url,
                        method: 'POST',
                        headers: {
                            'x-auth-token': getAuthToken()
                        },
                        data: json
                    }).done(function() {
                        alert("success");
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        alert("error");
                        console.log(textStatus);
                        console.log(errorThrown);
                    });
            }
            else {
                alert("Can't add movie. User not logged in.");
            }
        });
    }
    return {
        init: function() {
            setupEventListeners();
        }
    };
