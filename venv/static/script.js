let our;
let slider = document.querySelectorAll(".slider");
let innerSlider = document.querySelectorAll(".slider-inner");
let pressed = false;
let startx;
let x;

for (let i = 0; i < slider.length; i++) {
    slider[i].addEventListener("mousedown", e => {
        pressed = true
        startx = e.offsetX - innerSlider[i].offsetLeft
        slider[i].style.cursor = "grabbing"
    })

    slider[i].addEventListener("mouseenter", () => {
        slider[i].style.cursor = "grab"
    })

    slider[i].addEventListener("mouseup", () => {
        slider[i].style.cursor = "grab"
    })

    window.addEventListener("mouseup", () => {
        pressed = false
    })

    slider[i].addEventListener("mousemove", e => {
        if (!pressed) return
        e.preventDefault()
        x = e.offsetX

        innerSlider[i].style.left = `${x - startx}px`;
        checkboundary()
    })

    function checkboundary() {
        let outer = slider[i].getBoundingClientRect()
        let inner = innerSlider[i].getBoundingClientRect()

        if (parseInt(innerSlider[i].style.left) > 0) {
            innerSlider[i].style.left = "0px"
        } else if (inner.right < outer.right) {
            innerSlider[i].style.left = `-${inner.width - outer.width}px`
        }
    }
}

function show_order(id) {
    $.ajax({
        type: 'GET',
        url: '/api/keyword',
        data: {},
        success: function (response) {

            let rows = response['orders']
            let key1;
            let key2;
            let key3;
            let key4;
            for (let i = 0; i < rows.length; i++) {
                let keyd1 = rows[i]['live']
                key1 = keyd1.split(",");

                let keyd2 = rows[i]['age']
                key2 = keyd2.split(",");

                let keyd3 = rows[i]['hobby']
                key3 = keyd3.split(",");

                let keyd4 = rows[i]['tmi']
                key4 = keyd4.split(",");
            }
            if (id == 1) {
                $('#team-keyd1').empty();
                let temp_html = `<ul id="team-keyd" class="keyword">
                                           <li>${key1[0]}</li>
                                           <li>${key2[0]}</li>
                                           <li>${key3[0]}</li>
                                           <li>${key4[0]}</li>
                                       </ul>`
                $('#team-keyd1').append(temp_html)


            } else if (id == 2) {
                $('#team-keyd2').empty();
                let temp_html = `<ul id="team-keyd" class="keyword">
                                           <li>${key1[1]}</li>
                                           <li>${key2[1]}</li>
                                           <li>${key3[1]}</li>
                                           <li>${key4[1]}</li>
                                       </ul>`
                $('#team-keyd2').append(temp_html)
            } else if (id == 3) {
                $('#team-keyd3').empty();
                let temp_html = `<ul id="team-keyd" class="keyword">
                                           <li>${key1[2]}</li>
                                           <li>${key2[2]}</li>
                                           <li>${key3[2]}</li>
                                           <li>${key4[2]}</li>
                                       </ul>`
                $('#team-keyd3').append(temp_html)
            } else if (id == 4) {
                $('#team-keyd4').empty();
                let temp_html = `<ul id="team-keyd" class="keyword">
                                           <li>${key1[3]}</li>
                                           <li>${key2[3]}</li>
                                           <li>${key3[3]}</li>
                                           <li>${key4[3]}</li>
                                       </ul>`
                $('#team-keyd4').append(temp_html)
            } else if (id == 5) {
                $('#team-keyd5').empty();
                let temp_html = `<ul id="team-keyd" class="keyword">
                                           <li>${key1[4]}</li>
                                           <li>${key2[4]}</li>
                                           <li>${key3[4]}</li>
                                           <li>${key4[4]}</li>
                                       </ul>`
                $('#team-keyd5').append(temp_html)
            }

        }
    });
}


function save_order() {

    $.ajax({
        type: 'POST',
        url: '/prac',
        data: {},
        success: function (response) {
            alert(response['msg'])

        }
    });
}


window.onload = function () {

    $.ajax({
        type: "POST",
        url: "/api/goalPromise",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                our = JSON.parse(response["data"]);


            } else {
                alert("서버 오류!")
            }
        }
    })
}

function obj() {
    const object = document.getElementById("obj")
    const promise = document.getElementById("pro")
    object.innerHTML = our["goal"];
    object.style.display = ""
    promise.style.display = "none"
}

function pro() {
    const promise = document.getElementById("pro")
    const object = document.getElementById("obj")
    promise.innerHTML = our["promise"];
    promise.style.display = ""
    object.style.display = "none"
}

function show_layer(div_name) {
    const div00 = document.getElementById("div_00")
    const div01 = document.getElementById("div_01")
    const div02 = document.getElementById("div_02")
    const div03 = document.getElementById("div_03")
    const div04 = document.getElementById("div_04")
    const div05 = document.getElementById("div_05")

    switch (div_name) {
        case '1':
            div00.style.display = "none";
            div01.style.display = "";
            div02.style.display = "none";
            div03.style.display = "none";
            div04.style.display = "none";
            div05.style.display = "none";

            break;
        case '2':
            div00.style.display = "none";
            div01.style.display = "none";
            div02.style.display = "";
            div03.style.display = "none";
            div04.style.display = "none";
            div05.style.display = "none";
            break;
        case '3':
            div00.style.display = "none";
            div01.style.display = "none";
            div02.style.display = "none";
            div03.style.display = "";
            div04.style.display = "none";
            div05.style.display = "none";
            break;
        case '4':
            div00.style.display = "none";
            div01.style.display = "none";
            div02.style.display = "none";
            div03.style.display = "none";
            div04.style.display = "";
            div05.style.display = "none";
            break;
        case '5':
            div00.style.display = "none";
            div01.style.display = "none";
            div02.style.display = "none";
            div03.style.display = "none";
            div04.style.display = "none";
            div05.style.display = "";
            break;
    }
}


function getinfo(name) {
    $.ajax({
        type: "POST",
        url: "/api/info",
        data: {"name": name},
        success: function (response) {
            if (response["result"] == "success") {
                data = JSON.parse(response["informs"]);
                attachHtml(data)
            } else {
                alert("서버 오류!")
            }
        }
    })


}

function attachHtml(data) {

    let info = `<section class="team">
            <div class="media-keyword">
                    <div class="name_zone">
                        <a href="javascript:showPopUp()"style="color: black">${data.name}</a>
                    </div>
                    <div class="keyword_zone">
                        <div class="circle"> ${data.live} </div>
                        <div class="circle">${data.mbti} </div>
                        <a class="circle" href="${data.blog}" target="_blank" style="color: black">블로그</a>
                        <div class="circle" onclick="showDetail()">나의 장점</div>
                        <div class="circle" onclick="showDetail()">나의 스타일</div>
                        <div class="circle">${data.mbti}</div>
                        <div class="circle">${data.age}</div>
                        <div class="circle">${data.charac}</div>
                        <div class="circle" onclick="guestBook('${data.name}')">방명록</div>

                    </div>
                </div>
                <div class="media-img">
                    <div class="img_zone">
                        <img src="{{url_for('static', filename='${data.image1}')}}"/>
                       <img src={ url_for('static', filename=${data.image1}) }/>
                    </div>
                </div>
             </section>`;

    document.getElementById('team_info').innerHTML = info;
}

function showPopUp() {

    document.getElementById("text_zone").readOnly = false;
    document.getElementById("popup_layer").style.display = "block";
}

function showDetail(data) {
    document.getElementById("text_zone").readOnly = true;
    document.getElementById("text_zone").innerHTML = "좋아용";
    document.getElementById("detail_layer").style.display = "block";
}

function closePop(what) {
    document.getElementById(what).style.display = "none";
}


function save(name) {
    $.ajax({
        type: "POST",
        url: "/api/save",
        data: {"name": name, "text": document.getElementById("textarea").value},
        success: function (response) {
            if (response["result"] == "success") {
                alert("방명록 등록 성공!");
                document.getElementById("popup_layer").style.display = "none";
                getinfo(name);
            } else {
                alert("서버 오류!")
            }
        }
    })
}

