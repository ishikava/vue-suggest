let poly = require('es6-promise').polyfill()
let Vue = require('vue')
let axios = require('axios')
let lodash = require('lodash')

new Vue({
    el: '#app',
    data: {
        question: '',
        answer: []
    },
    watch: {
        question: function (newQuestion, oldQuestion) {
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 1)
    },
    methods: {
        getAnswer: function () {
            let vm = this
            axios.get('/api?text=' + encodeURIComponent(vm.question))
                .then(function (response) {
                   vm.answer = response.data[1]
                })
                .catch(function (error) {
                    vm.error = 'Ошибка! Не могу связаться с API. ' + error
                })
        },
        chooseItem: function (e) {
           this.question = e.target.innerHTML.trim()
        }
    }
})

document.getElementById("app").style.marginTop = (window.innerHeight / 3) + "px";
