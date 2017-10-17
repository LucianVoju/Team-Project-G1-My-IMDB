const controller = (function (userController) {
    const url = "https://ancient-caverns-16784.herokuapp.com/movies";

    function setupEventListeners() {
        console.log("I am not dead!");
        $('#add-form').on('submit', function (e) {
            e.preventDefault(); //prevent form from submitting
            var data = $("#add-form :input").serializeArray();
            data = data.filter(e => e.value != "");
            if (data.length == 0) {
                alert("Can't submit form with empty fields");
                return;
            }
            var json = data.reduce((json, e, index) => {
                json[e.name] = e.value;
                return json;
            }, {});
            console.log(data);
            console.log(json);
            if (userController.isLoggedIn()) {
                jQuery.ajax({
                        url: url,
                        method: 'POST',
                        headers: {
                            'x-auth-token': userController.getAuthToken()
                        },
                        data: json
                    }).done(function () {
                        alert("success");
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert("error");
                        console.log(textStatus);
                        console.log(errorThrown);
                    });
            } else {
                alert("Can't add movie. User not logged in.");
            }
        });
    }
    return {
        init: function () {
            setupEventListeners();
        }
    };

})(userController);

window.addEventListener("load", controller.init);