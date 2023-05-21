const gridHelper = {
  createBg: function (gridWidth, gridGap, gridNum) {
    let grids = ''
    let gray = 'rgba(0, 0, 0, .05)'
    for (var c = 1; c <= gridNum; c++) {
      let comma = ''
      let gap = ''
      let grid = ''
      if (c === 1) {
        grid = `${grid}${comma} ${gray} 0px, ${gray} ${(gridWidth * c)}px`
        gap = `, transparent ${gridWidth * c}px, transparent ${(gridWidth * c) + gridGap}px`
      } else if (c === gridNum) {
        comma = ','
        grid = `${gray} ${gridWidth * (c - 1) + (gridGap * (c - 1))}px, ${gray} 100px`
      } else {
        comma = ','
        grid = `${gray} ${gridWidth * (c - 1) + (gridGap * (c - 1))}px, ${gray} ${(gridWidth * c + gridGap * (c - 1))}px`
        gap = `, transparent ${gridWidth * c + (gridGap * (c - 1))}px, transparent ${gridWidth * c + gridGap * (c - 1) + gridGap}px`
      }
      grids = `${grids} ${comma} ${grid} ${gap}`
    }
    return grids
  },
  stringGen: (len) => {
    var text = ''
    var charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return text
  }
}

let app = new Vue({
  el: '#app',
  data: {
    layout: {
      grid: {
        'grid-auto-columns': 6,
        'grid-auto-rows': 4,
        'grid-column-gap': 20,
        'grid-row-gap': 15,
        'justify-items': '',
        'align-items': '',
        'justify-content': '',
        'align-content': ''
      },
      measure: {}
    },
    items: [
      {
        id: '123',
        isSelected: false,
        style: {
          'grid-column-start': 2,
          'grid-column-end': 3,
          'grid-row-start': 2,
          'grid-row-end': 3,
          'background-color': 'rgb(244, 36, 0)',
          'z-index': 1,
          'justify-self': 'auto',
          'align-self': 'auto'
        }
      }
    ],
    currentItem: {

    },
    defaultItem: {
      isSelected: false,
      style: {
        'grid-column-start': 1,
        'grid-column-end': 2,
        'grid-row-start': 1,
        'grid-row-end': 2,
        'background-color': 'rgb(0, 0, 0)',
        'z-index': 1,
        'justify-self': 'auto',
        'align-self': 'auto'
      }
    },
    controllerPanel: {
      isActive: false
    },
    grid: {

    },
    styles: {
      'justify-self': [
        'auto', 'start', 'end', 'center', 'stretch'
      ],
      'align-self': [
        'auto', 'start', 'end', 'center', 'stretch'
      ],
      'justify-items': [
        'auto', 'start', 'end', 'center', 'stretch'
      ],
      'align-items': [
        'auto', 'start', 'end', 'center', 'stretch'
      ],
      'justify-content': [
        'auto', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'
      ],
      'align-content': [
        'auto', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'
      ]
    }
  },
  methods: {
    closeController: function (e) {
      e.preventDefault()
      this.controllerPanel.isActive = !this.controllerPanel.isActive
    },
    selectItem: function (item, key, e) {
      e.preventDefault()
      this.items.forEach(function (ele, i) {
        ele.isSelected = false
      })
      if (this.currentItem.id === item.id) {
        this.currentItem = {}
        item.isSelected = false
      } else {
        this.currentItem = item
        item.isSelected = true
      }
    },
    addItem: function () {
      let newItem = {}
      newItem.style = Object.assign({}, this.defaultItem.style)
      newItem.id = gridHelper.stringGen(5)
      this.items.push(newItem)
      console.log(newItem, this.items)
    },
    removeItem: function (key) {
      this.items.splice(key, 1)
    }
  },
  computed: {
    gridGradient: function () {
      let containerWidth = $('#grid-container').width()
      let containerHeight = $('#grid-container').height()
      let columnNum = this.layout.grid['grid-auto-columns']
      let rowNum = this.layout.grid['grid-auto-rows']
      let columnGap = parseInt(this.layout.grid['grid-column-gap'])
      let rowGap = parseInt(this.layout.grid['grid-row-gap'])
      let columnWidth = (containerWidth - (columnGap * (columnNum - 1))) / columnNum
      let rowHeight = (containerHeight - (rowGap * (rowNum - 1))) / rowNum
      this.layout.measure.width = columnWidth
      this.layout.measure.height = rowHeight

      let columns = gridHelper.createBg(columnWidth, columnGap, columnNum)
      let rows = gridHelper.createBg(rowHeight, rowGap, rowNum)

      // let str = `to right, ${columns}`
      return `linear-gradient(to right, ${columns}), linear-gradient(to bottom, ${rows})`
    },
    showPxLayout: function () {
      let columnNum = this.layout.grid['grid-auto-columns']
      let rowNum = this.layout.grid['grid-auto-rows']
      return {
        'grid-auto-columns': this.layout.measure.width + 'px',
        'grid-auto-rows': this.layout.measure.height + 'px',
        'grid-column-gap': this.layout.grid['grid-column-gap'] + 'px',
        'grid-row-gap': this.layout.grid['grid-row-gap'] + 'px',
        'justify-items': this.layout.grid['justify-items'],
        'align-items': this.layout.grid['align-items'],
        'justify-content': this.layout.grid['justify-content'],
        'align-content': this.layout.grid['align-content']
      }
    },
    showFrLayout: function () {
      let columnNum = this.layout.grid['grid-auto-columns']
      let rowNum = this.layout.grid['grid-auto-rows']
      return {
        'grid-auto-columns': this.layout.grid['grid-auto-columns'] + 'fr',
        'grid-auto-rows': this.layout.grid['grid-auto-rows'] + 'fr',
        'grid-column-gap': this.layout.grid['grid-column-gap'] + 'px',
        'grid-row-gap': this.layout.grid['grid-row-gap'] + 'px',
        'justify-items': this.layout.grid['justify-items'],
        'align-items': this.layout.grid['align-items'],
        'justify-content': this.layout.grid['justify-content'],
        'align-content': this.layout.grid['align-content']
      }
    }
  }
})

