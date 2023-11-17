<template>

<li>
      <input type="checkbox" :id="task.id"/>
      <label :for="task.id">
        <h2>{{ task.title }}</h2><span>{{ task.description }}</span>
      </label>
    </li>


</template>

<script setup>
const props = defineProps(["task"]);
const task = props.task;
</script>

<style>

input[type=checkbox] {
  display: none;
}

label {
  background: #d2d3d5;
  height: 120px;
  width: 100%;
  display: block;
  border-bottom: 1px solid #2c3e50;
  color: white;
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
  text-transform: capitalize; 
  letter-spacing: 1px;
  position: relative;
  padding: 5px 5px 5px 70px;
  box-sizing:  border-box;
  
}
h2 {
    padding-top:-500px;
    top: -100px;
    margin-top: -100px;
    line-height: 500px;
}


label:before{
  content:"";
  width: 19px;
  height: 19px;
  border: 1px solid #416282;
  display: block;
  position: absolute;
  left: 20px;
  top: 20px;
 /* transition: border .7s ease;*/
  border-radius: 100%; 
  z-index: 99999;
}

label:after{
  content:"";
  width: 60px;
  height: 120px;
  background: #2c3e50;
  position: absolute;
  left: 0px;
  top: 0px;
    
}

li:first-child label{
  border-right: 8px solid #f87c85;
  /*text-transform: uppercase;*/
}

li:nth-child(2) label{
  border-right: 8px solid orange;
}

li:nth-child(3) label{
  border-right: 8px solid #b985ea;
}

li:nth-child(4) label{
  border-right: 8px solid #3498db;
}

li:last-child label{
  border-right: 8px solid #43d6b0;
}

</style>
