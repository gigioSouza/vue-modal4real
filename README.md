# Real Modals in your Vue application

A lib for dealing with modal without having to defining it locally it into your components and handling its visualization with a boolean flag.

You just need to:
- add the plugin
- add the `<Modal/>` component into your root component (aka `<App/>`)
- create a component for your modal<sup>*</sup>
- "open" your modal component

> :warning: &nbsp;&nbsp; Vue 3 only!  
> :warning: &nbsp;&nbsp; CSS not included.  
> 
> <sup>*</sup> read [Modal API](#modal-api) before using, don't "GO HORSE" 
> 
---

# Content:
- [Using](#using)
  - [Add Plugin](#add-plugin) 
  - [Composition API](#composition-api) 
  - [Options API](#options-api)
- [Modal API](#modal-api)
  - [Modal Component](#modal-component)
    - [Mandatory Emits](#mandatory-emits)
      - [Composition API](#emits---composition-api)
      - [Options API](#emits---options-api)
  - [open](#open)
    - [Config](#config)
    - [Props](#props)
    - [Why returning a Promise?](#why-returning-a-promise)
- [CSS](#css)

## Using

### Add Plugin
```js
import { createApp } from 'vue';
import Modals from 'vue-modal4real';
import App from '@/App.vue';

createApp(App)
  .use(Modals)
  .mount('#app');
```

### Composition API
```vue
<script setup>
import { useModals } from 'vue-modal4real';
import MyModal from '@/components/MyModal';

const modals = useModals();
function openModal() {
  modals.open(MyModal);
}
</script>

<template>
  <button @click="openModal">Open Modal</button>
</template>
```

### Options API
```vue
<template>
  <button @click="openModal">Open Modal</button>
</template>

<script>
import { useModals } from 'vue-modal4real';
import MyModal from '@/components/MyModal';

export default {
  name: 'App',
  methods: {
    openModal() {
      this.$modals.open(MyModal);
    }
  }
}
</script>
```

### Modal API

## Modal Component

In order to use a component as a Modal you only have one mandatory new config to use.
Define two emits for your component: **"resolve"** and **"reject"**.  
Those two new emits is how you close your modal, yes it's `Promise`.

### Mandatory Emits
#### Emits - Composition API
```vue
<script setup>
...
const emit = defineEmits(['resolve', 'reject']);
...
</script>
```

#### Emits - Options API
```vue
<script>
export default {
  ...
  emits: ['resolve', 'reject'],
  ...
}
</script>
```

## open
The `open` function takes 3 arguments and returns a `Promise` containing a reference to the Modal itself.
1. The Modal Component
2. The Modal Configuration
3. Props for the Modal Component

### Config
These are configurations used to open your Modal

|Property|Type|Default|Description|
|--|--|--|--|
|rejectOnBackdrop|boolean|true|if `true` invoke `reject` when the user click out of your component| 

### Props
An object containing props you'd like to set into your Modal Component.

---
Example:

InfoModal.vue
```vue
<script setup>
const props = defineProps({
  msg: String
});
const emits = defineEmits(['resolve', 'reject']);
</script>
<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="emits('resolve')">OK</button>
  </div>
</template>
```

```vue

<script setup>
...
const modals = useModals();

modals.open(InfoModal, 
  { rejectOnBackdrop: false }, 
  { msg: 'Click in "OK" if you read this!' }
);
...
</script>
```
---

### Why returning a `Promise`?
Cover all this scenarios:
- Retrieve data to the calling component when closing the modal
- Have positive and negative responses from Modal and handle it in the most JS way
- The Modal may close without the user directly interacting with its closing process,
  like changing route or programmatically forcing the modal to close

---
#### Example:
A confirmation Modal would `resolve` if the user confirm it and `reject` if deny it.

Your Modal:
```vue
<div>
  <p>Are you sure of this decision?<p>
  <button @click="emit('reject')">No, I'm having second thoughts</button>
  <button @click="emit('resolve')">Hell yeah I'm sure</button>
</div>
```

Component opening the confirmation modal:
```vue
<script setup>
import { useModals } from 'vue-modal4real';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

const modals = useModals();
modals.open(ConfirmationModal)
  .then(() => console.log('The user knows too much'))
  .catch(() => console.log('Everything is under control')); 
</script>
```
---

## CSS

This lib doesn't have any css with it, you are free to style your modals the way you like the most.  
The only style treatment this lib does is blocking the page scroll when a modal is opened.

The classes you must implement to style the modal backdrop and the modal placement is `modalContainer` and `modalContent`.  
`modalContainer` is a container div used for background/backdrop.  
`modalContent` is the only `modalContainer` child and it's were your Modal Component will be rendered.  

### Example

A simple css to open your modal with a black backdrop with your Modal placed in the center.

Here it fix the `modalContainer` with full width and height and apply a black background color with 20% opacity.
```css
.modalContainer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, .2);
}
```

Here it places to `modalContent` in page center using relative top and left and set a flex display for your component to be rendered.
```css
.modalContainer .modalContent {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
}
```
