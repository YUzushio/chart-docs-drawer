<template>
  <button @click="$emit('input', id)" :class="[active, 'tab']">
    {{ label }}
    
  </button>
</template>

<script>
module.exports= {
  props: {
    id: Number,
    label: String,
    value: Number
  },
  computed: {
    active() {
      // drawHorizontalLine();
      // drawVerticalLine();
              let cs = document.getElementById('canvas');
            console.log(cs);
            if(typeof cs.getContext === 'function'){
                let ctx = cs.getContext('2d');
                let csWidth = cs.width;
                let csHeight = cs.height;
                let center = {
                    x: csWidth / 2,
                    y: csHeight / 2
                };
                ctx.fillStyle = 'rgba(234,234,234,1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, center.y);
                for (var i = 0; i < csWidth; i++) {
                    if(i%9==0) ctx.fillRect(i, center.y, 3,3);
                }   
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(center.x, 0);
                for (var j = 0; j < csHeight; j++) {
                    if(j%9==0) ctx.fillRect(center.x, j, 3,3);
                }
                ctx.closePath();
                ctx.stroke();
            }
      return this.value === this.id ? 'active' : false
    }
  }
}
</script>

<style scoped>
.tab {
  border-radius: 2px 2px 0 0;
  background: #fff;
  color: #311d0a;
  line-height: 24px;
}
.tab:hover {
  background: #eeeeee;
}
.active {
  background: #f7c9c9;
}
</style>