let xhr = new XMLHttpRequest();
const url = "https://travel-wang-app.herokuapp.com/travel";
xhr.open('get', url, true);
xhr.send(null);
xhr.onload = function () {
    var loading = document.querySelector(".loading");
    loading.remove();
    //xhr回來
    const res = JSON.parse(xhr.responseText);
    //data裝成陣列
    let data = Object.keys(res).map(function (_) {
        return res[_];
    });

    //宣告dom
    var list = document.querySelector('.content');
    var city = document.querySelector('.city');
    var town = document.querySelector('.town');
    //載入時渲染
    var str = '';
    for (var i = 0; i < data.length; i++) {
        let temp = `            <div class="card">
        <img class="card-img" src=${data[i].PicURL} alt="">
        <div class="card-gradient"></div>
        <div class="card-head">${data[i].City}</div>
        <div class="card-subtitle">${data[i].Town}</div>
        <div class="card-title">${data[i].Name}</div>
        <div class="card-hr"></div>
        <div class="card-text">
        ${data[i].FoodFeature}
        </div>
    </div>`
        str += temp;
    }
    list.innerHTML = str;
    mouseEvent();
    //載入時渲染

    //行政區過濾
    var cityList = [];
    for (var value of data) {
        cityList.push(value.City)
    }
    var cityFilter = cityList.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
    });

    var str2 = '';
    for (var value of cityFilter) {
        var selectCity = "<option value=''>請選擇行政區...</option>";
        var temp = `<option value=${value}>${value}</option>`;
        str2 += temp;
    }
    city.innerHTML = selectCity + str2;
    //行政區過濾

    function updateCity(e) {
        var select = e.target.value;
        var str = "";
        for (var value of data) {
            if (select === value.City) {
                var temp = `            <div class="card">
        <img class="card-img" src=${value.PicURL} alt="">
        <div class="card-gradient"></div>
        <div class="card-head">${value.City}</div>
        <div class="card-subtitle">${value.Town}</div>
        <div class="card-title">${value.Name}</div>
        <div class="card-hr"></div>
        <div class="card-text">
        ${value.FoodFeature}
        </div>
    </div>`
                str += temp;
            } else if (select === "") {
                return
            }
        }
        list.innerHTML = str;
        mouseEvent();
    }

    function updateTown(e) {
        var select = e.target.value;
        var str = "";
        var townList = [];
        for (var value of data) {
            if (select === value.City) {
                townList.push(value.Town);
            }
        }
        var townFilter = townList.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        });
        for (var value of townFilter) {
            var selectTown = "<option value=''>請選擇鄉鎮區...</option>";
            var temp = `<option value=${value}>${value}</option>`;
            str += temp;
        }
        town.innerHTML = selectTown + str;
    }

    function renderCard(e) {
        var select = e.target.value;
        var str = "";
        for (var value of data) {
            if (select === value.Town) {
                var temp = `            <div class="card">
                <img class="card-img" src=${value.PicURL} alt="">
                <div class="card-gradient"></div>
                <div class="card-head">${value.City}</div>
                <div class="card-subtitle">${value.Town}</div>
                <div class="card-title">${value.Name}</div>
                <div class="card-hr"></div>
                <div class="card-text">
                ${value.FoodFeature}
                </div>
            </div>`
                str += temp;
            } else if (select === "") {
                return
            }
        }
        list.innerHTML = str;
        var card = document.querySelectorAll(".card");
        var cardImg = document.querySelectorAll(".card-img");
        var cardSubtitle = document.querySelectorAll(".card-subtitle");
        var cardTitle = document.querySelectorAll(".card-title");
        var cardText = document.querySelectorAll(".card-text");
        var cardHr = document.querySelectorAll(".card-hr");
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener("mouseenter", function (e) {
                cardImg[i].style.transform = "scale(1.05)";
                cardSubtitle[i].style.bottom = "85px";
                cardTitle[i].style.bottom = "65px";
                cardText[i].style.opacity = "1";
                cardText[i].style.transition = ".3s";
                cardHr[i].style.opacity = "1";
                cardHr[i].style.transition = ".3s";
            })

            card[i].addEventListener("mouseleave", function (e) {
                cardImg[i].style.transform = "scale(1)";
                cardSubtitle[i].style.bottom = "35px";
                cardTitle[i].style.bottom = "15px";
                cardText[i].style.opacity = "0";
                cardHr[i].style.opacity = "0";
            })
        }
    }
    city.addEventListener("change", updateCity, false); //監聽行政區
    city.addEventListener("change", updateTown, false); //渲染鄉鎮區
    town.addEventListener("change", renderCard, false); //渲染該鄉鎮區的卡片


    //hover事件
    function mouseEvent() {
        var card = document.querySelectorAll(".card");
        var cardImg = document.querySelectorAll(".card-img");
        var cardSubtitle = document.querySelectorAll(".card-subtitle");
        var cardTitle = document.querySelectorAll(".card-title");
        var cardText = document.querySelectorAll(".card-text");
        var cardHr = document.querySelectorAll(".card-hr");
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener("mouseenter", function (e) {
                cardImg[i].style.transform = "scale(1.05)";
                cardSubtitle[i].style.bottom = "85px";
                cardTitle[i].style.bottom = "65px";
                cardText[i].style.opacity = "1";
                cardText[i].style.transition = ".3s";
                cardHr[i].style.opacity = "1";
                cardHr[i].style.transition = ".3s";
            })

            card[i].addEventListener("mouseleave", function (e) {
                cardImg[i].style.transform = "scale(1)";
                cardSubtitle[i].style.bottom = "35px";
                cardTitle[i].style.bottom = "15px";
                cardText[i].style.opacity = "0";
                cardHr[i].style.opacity = "0";
            })
        }
    }

    //hover事件
}