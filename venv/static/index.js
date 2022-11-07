<script>

    window.onload = function(){

        $.ajax({
            type: "POST",
            url: "/api/goalPromise",
            data : {},
            success: function (response) {
                if (response["result"] == "success") {
                    data = JSON.parse(response["data"]);
                    // id 받아서 innerhtml 해놓기

                } else {
                    alert("서버 오류!")
                }
            }
        })
    }

</script>