let app = new Vue({
  el: '#app',
  data: {
    layout: {
      maxColumn: 50,
      maxRow: 50
    },
    itemNumber: 10,
    items: [{
      style: {
        'grid-column-start': 25,
        'grid-row-start': 25,
        'background-color': '#0070e0'
      }
    }],
    defaultItem: {
      style: {}
    },
    history: [],
    direction: 'right',
    randomItem: {
      style: {
        'grid-column-start': 37,
        'grid-row-start': 42,
        'background-color': 'green'
      }
    }
  },
  methods: {
    changeDirection (e) {
      let vm = this
      console.log(e.keyCode)
      if (e.keyCode === 37 && vm.direction !== 'right') {
        vm.direction = 'left'
      } else if (e.keyCode === 38 && vm.direction !== 'bottom') {
        vm.direction = 'up'
      } else if (e.keyCode === 39 && vm.direction !== 'left') {
        vm.direction = 'right'
      } else if (e.keyCode === 40 && vm.direction !== 'up') {
        vm.direction = 'bottom'
      }
    },
    updatePosition () {
      let vm = this

      // 動作存起來
      vm.items.forEach(function (item, i) {
        vm.history[i] = {}
        vm.history[i]['grid-column-start'] = item.style['grid-column-start']
        vm.history[i]['grid-row-start'] = item.style['grid-row-start']
        // console.log(i, vm.history[i]['grid-row-start'])
      })

      vm.updateDirect()

      // 如果數量不足時，增加一個
      if (vm.items.length < vm.itemNumber) {
        vm.items.push({
          style: {}
        })
      }

      // 從前一個物件取得位置
      vm.items.forEach(function (item, i) {
        if (i && vm.history[i]) {
          item.style['grid-row-start'] = vm.history[i - 1]['grid-row-start']
          item.style['grid-column-start'] = vm.history[i - 1]['grid-column-start']
          item.style['background-color'] = '#3c9dff'
        }
      })
    },
    updateDirect (direction) {
      let vm = this
      if (vm.direction === 'right') {
        if (vm.items[0].style['grid-column-start'] < vm.layout.maxColumn - 1) {
          vm.items[0].style['grid-column-start'] += 1
        } else {
          vm.items[0].style['grid-column-start'] = 1
        }
      }
      if (vm.direction === 'left') {
        if (vm.items[0].style['grid-column-start'] > 1) {
          vm.items[0].style['grid-column-start'] -= 1
        } else {
          vm.items[0].style['grid-column-start'] = vm.layout.maxColumn - 1
        }
      }

      if (vm.direction === 'bottom') {
        if (vm.items[0].style['grid-row-start'] < vm.layout.maxRow - 1) {
          vm.items[0].style['grid-row-start'] += 1
        } else {
          vm.items[0].style['grid-row-start'] = 1
        }
      }

      if (vm.direction === 'up') {
        if (vm.items[0].style['grid-row-start'] > 1) {
          vm.items[0].style['grid-row-start'] -= 1
        } else {
          vm.items[0].style['grid-row-start'] = vm.layout.maxRow - 1
        }
      }

      if (vm.items[0].style['grid-column-start'] === vm.randomItem.style['grid-column-start'] &&
        vm.items[0].style['grid-row-start'] === vm.randomItem.style['grid-row-start']
      ) {
        vm.itemNumber += 1
        vm.generateNewRandom()
      }
    },
    generateNewRandom () {
      let vm = this
      vm.randomItem.style['grid-column-start'] = Math.floor((Math.random() * vm.layout.maxColumn) + 1)
      vm.randomItem.style['grid-row-start'] = Math.floor((Math.random() * vm.layout.maxRow) + 1)
    }
  },
  mounted () {
    let vm = this
    setInterval(() => vm.updatePosition(), 100)
    window.addEventListener('keyup', this.changeDirection)
  }
})
