let data;
let targetNumber; // a 링크 클릭시 작동하는 버튼 메소드에 매개값을 넣어야 하는데 도저히 글 번호를 넣을수가 없어서 전역변수 만듦 ㅠㅠ
$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: "/api/info",
        data: {'name': new URLSearchParams(location.search).get('name')},
        success: function (response) {
            if (response["result"] == "success") {
                data = JSON.parse(response["informs"]);
                let total = 0;
                for (var i in data) {
                    if ("info" in data[i]) {
                        document.getElementById("name_zone").innerHTML = data[i].name;
                        document.getElementById("mbti_zone").innerHTML = data[i].info.essence.mbti;
                        document.getElementById("good_zone").innerHTML = data[i].info.essence.goodcharactor;
                        document.getElementById("style_zone").innerHTML = data[i].info.essence.style;
                        document.getElementById("adress_zone").href = data[i].info.essence.blog;
                        document.getElementById("img-myphoto").src += data[i].name + "/main.jpg";
                        document.getElementById("tmi_zone").innerHTML += data[i].info.TMI.TMI1 + "<br>";
                    } else if (("text" in data[i] && "writer" in data[i])) {

                        total += 1;
                        if (data[i].show == true) {
                            spread(data[i]);
                        }
                    }


                    document.getElementById("total").value = total;
                }

            } else {
                alert("서버 오류!")
            }
        }
    })
})


function showPopUp() {
    document.getElementById("textarea").value = "";
    document.getElementById("namearea").value = "";
    document.getElementById("popup_layer").style.display = "block";
}


function closePop(what) {

    document.getElementById(what).style.display = "none";
}



function save(name) {

    if (document.getElementById("namearea").value == "") {
        alert("작성자 이름을 쓰세요");
        return;
    } else if (document.getElementById("textarea").value == "") {
        alert("내용 쓰세요");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/api/save",
        data: {
            "name": name,
            "text": document.getElementById("textarea").value,
            "writer": document.getElementById("namearea").value,
            "total": document.getElementById("total").value
        },
        success: function (response) {
            if (response["result"] == "success") {
                alert("방명록 등록 성공!");
                document.getElementById("guestbook").innerHTML = "";
                document.getElementById("popup_layer").style.display = "none";
                let data = JSON.parse(response["data"]);
                let total = 0;
                for (let i in data) {
                    if (("text" in data[i] && "writer" in data[i])) {
                        total += 1;
                        if(data[i].show == true)
                        {
                            spread(data[i]);
                        }

                    }
                }
                document.getElementById("total").value = total


            } else {
                alert("서버 오류!")
            }
        }
    })
}

function spread(data) {

    let inner = `
                   
                <div className="card-body">
                
                    <blockquote className="blockquote mb-0">
                        <p id="text_${data.number}">${data.text}</p>
                        <footer className="blockquote-footer" id="writer_${data.number}">${data.writer}</footer>
                    </blockquote>
                </div>
                <input type="button" onclick="scratch(${data.number});" value="삭제">
                <input type="button" onclick="showPopUpForUpdate(${data.number});" value="수정">
             </div>
             
            `;

    document.getElementById("guestbook").innerHTML += inner;


}


function scratch(number) {
    $.ajax({
        type: "POST",
        url: "/api/scratch",
        data: {
            "name": new URLSearchParams(location.search).get('name'),
            "number" : number
        },
        success: function (response) {
            if (response["result"] == "success") {

                alert("삭제 성공!")
                location.reload();
            } else {
                alert("서버 오류!")
            }
        }
    })
}

function updating(number){

     if(document.getElementById("namearea").value == "")
    {
        alert("내용을 기입하세요")
        return;
    }



    $.ajax({
        type: "POST",
        url: "/api/updating",
        data: {
            "name": new URLSearchParams(location.search).get('name'),
            "number" : number,
            "text" : document.getElementById("textarea").value
        },
        success: function (response) {
            if (response["result"] == "success") {

                alert("수정 성공!")
                location.reload();

            } else {
                alert("서버 오류!")
            }

            document.getElementById("namearea").readOnly = false;
            document.getElementById("savingButton").style.display = "block";
            document.getElementById("updating_zone").style.display = "none";

        }
    })



}



function showPopUpForUpdate(number) {
    document.getElementById("textarea").value = document.getElementById("text_"+number).innerText;
    document.getElementById("namearea").value = document.getElementById("writer_"+number).innerText;
    document.getElementById("namearea").readOnly = true;
    document.getElementById("popup_layer").style.display = "block";
    document.getElementById("savingButton").style.display = "none";
    document.getElementById("updating_zone").style.display = "block";
    targetNumber = number
}

