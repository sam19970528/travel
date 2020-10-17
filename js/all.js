const xhr = new XMLHttpRequest()
const url = "https://travel-wang-app.herokuapp.com/travel"
xhr.open('get', url, true)
xhr.send(null)
xhr.onload = function () {
    const loading = document.querySelector(".loading")
    loading.remove()
    //xhr回來
    const res = JSON.parse(xhr.responseText)
    //data裝成陣列
    let data = Object.keys(res).map(function (_) {
        return res[_];
    })

    //宣告dom
    const list = document.querySelector('.content')
    const city = document.querySelector('.city')
    const town = document.querySelector('.town')
    //載入時渲染
    function loadAllCard() {
        let str = ''
        for (var value of data) {
            let temp = `            <div class="card">
            <img class="card-img" src=${value.PicURL} alt="food-picture">
            <div class="card-gradient"></div>
            <div class="card-head">${value.City}</div>
            <div class="card-subtitle">${value.Town}</div>
            <div class="card-title">${value.Name}</div>
            <div class="card-hr"></div>
            <div class="card-text">
            ${value.FoodFeature}
            </div>
        </div>`
            str += temp
        }
        list.innerHTML = str
        mouseEvent()
    }
    loadAllCard()
    //載入時渲染

    //行政區選項
    function selectCityFilter() {
        let cityList = []
        for (var value of data) {
            cityList.push(value.City)
        }
        let cityFilter = cityList.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        })

        let str = ''
        let selectCity = "<option value=''>請選擇行政區...</option>"
        for (var value of cityFilter) {
            var temp = `<option value=${value}>${value}</option>`
            str += temp
        }
        city.innerHTML = selectCity + str
    }
    selectCityFilter()
    //行政區選項


    //監聽行政區渲染卡片
    function updateCity(e) {
        let select = e.target.value
        let str = ""
        for (var value of data) {
            if (select === value.City) {
                let temp = `            <div class="card">
        <img class="card-img" src=${value.PicURL} alt="food-picture">
        <div class="card-gradient"></div>
        <div class="card-head">${value.City}</div>
        <div class="card-subtitle">${value.Town}</div>
        <div class="card-title">${value.Name}</div>
        <div class="card-hr"></div>
        <div class="card-text">
        ${value.FoodFeature}
        </div>
    </div>`
                str += temp
            } else if (select === "") {
                return
            }
        }
        list.innerHTML = str
        mouseEvent()
    }


    //監聽行政區渲染出該鄉鎮區
    function selectTownFilter(e) {
        let select = e.target.value
        let str = ""
        let townList = []
        for (var value of data) {
            if (select === value.City) {
                townList.push(value.Town)
            }
        }
        let townFilter = townList.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        })
        let selectTown = "<option value=''>請選擇鄉鎮區...</option>"
        for (var value of townFilter) {
            let temp = `<option value=${value}>${value}</option>`
            str += temp
        }
        town.innerHTML = selectTown + str
    }


    //監聽鄉鎮區後渲染卡片
    function updateTown(e) {
        let select = e.target.value
        let str = ""
        for (var value of data) {
            if (select === value.Town) {
                let temp = `            <div class="card">
                <img class="card-img" src=${value.PicURL} alt="food-picture">
                <div class="card-gradient"></div>
                <div class="card-head">${value.City}</div>
                <div class="card-subtitle">${value.Town}</div>
                <div class="card-title">${value.Name}</div>
                <div class="card-hr"></div>
                <div class="card-text">
                ${value.FoodFeature}
                </div>
            </div>`
                str += temp
            } else if (select === "") {
                return
            }
        }
        list.innerHTML = str
        mouseEvent()
    }


    //hover事件
    function mouseEvent() {
        const card = document.querySelectorAll(".card")
        const cardImg = document.querySelectorAll(".card-img")
        const cardSubtitle = document.querySelectorAll(".card-subtitle")
        const cardTitle = document.querySelectorAll(".card-title")
        const cardText = document.querySelectorAll(".card-text")
        const cardHr = document.querySelectorAll(".card-hr")
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener("mouseenter", function () {
                cardImg[i].style.transform = "scale(1.05)"
                cardSubtitle[i].style.bottom = "85px"
                cardTitle[i].style.bottom = "65px"
                cardText[i].style.opacity = "1"
                cardText[i].style.transition = ".3s"
                cardHr[i].style.opacity = "1"
                cardHr[i].style.transition = ".3s"
            })

            card[i].addEventListener("mouseleave", function () {
                cardImg[i].style.transform = "scale(1)"
                cardSubtitle[i].style.bottom = "35px"
                cardTitle[i].style.bottom = "15px"
                cardText[i].style.opacity = "0"
                cardHr[i].style.opacity = "0"
            })
        }
    }

    //hover事件

    //change監聽
    city.addEventListener("change", updateCity, false) //監聽行政區
    city.addEventListener("change", selectTownFilter, false) //渲染鄉鎮區
    town.addEventListener("change", updateTown, false) //渲染該鄉鎮區的卡片


}