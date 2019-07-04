<template>
    <a href="" class='btn'>
        <slot></slot>
    </a>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>

/*
COLORS:

Light blue: #537895
Medium blue: #2E4C6A
Dark blue: #09203f

*/

/* : is a pseudo class
it allows to add special conditions 
:link - indicates that it's a link
:visited - when a user has already clicked */


.btn {
    &:link, 
    &:visited {
        text-transform: uppercase;
        text-decoration: none;
        padding: 1rem 3rem;
        display: inline-block;
        transition: all .2s;
        position: relative;
        font-size: $default-font-size;
       
    }
    
    &:hover {
        transform: translateY(-.1rem);
        box-shadow: 0 1rem 1rem rgba($color-black, .3);
    }
    
    &:active {
        transform: translateY(-.1rem);
        box-shadow: 0 .5rem 1rem rgba($color-black, .3);
    }
    
    &--white {
        border: .2rem solid $color-white;
        color: $color-gray-light-1;

        &:hover {
            border: .2rem solid rgba($color-white, .8);
            background-color: rgba($color-white,.8);
            color: $color-primary;
        }
    }
    
}


</style>
