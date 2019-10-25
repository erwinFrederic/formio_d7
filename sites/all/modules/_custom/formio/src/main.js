import Vue from 'vue'
import { FormBuilder } from 'vue-formio';
import { Form } from 'vue-formio';

//import { FormBuilder } from 'vue-formio';
import '../node_modules/formio-vue/dist/formio-vue.css';
import '../assets/css/styles.css';


(function ($) {
    $(document).ready(function () {

        /****************** VUE-JS *******************/
        var vm = new Vue({
            el: '#formio',
            data: {
              form: {},
              jsonFormDefinition: '',
            },
            components: { formbuilder: FormBuilder,formio: Form },
          /**  components: {
              formio: Form,
              //formbuilder: FormBuilder
            },**/

            created: function () {
             // `this` est une référence à l'instance de vm

           },
           mounted: function () {
             this.renderForm()
             this.refineButton()
           },
          methods: {
             refineButton: function () {
               var form = document.querySelector('.formarea')
               console.log( form )
               form.addEventListener ('DOMSubtreeModified', function() {
                 // document.querySelector('.formbuilder .formio-component-submit button').removeAttribute('disabled')
               })
             },
             onSubmit: function(event, e) {
                this.jsonFormDefinition = JSON.stringify(event)
                console.log(JSON.stringify(event) + " event schema")
                this.renderForm()
                // return true
             },
             renderForm: function () {
               console.log (this.jsonFormDefinition)
               if (this.jsonFormDefinition !== '' ) {
                 Formio.createForm (
                   document.querySelector('#renderForm'),
                   JSON.parse(this.jsonFormDefinition)
                 )
               }

             }
           }

            // fournit le store avec l'option `store`.
            // cela injectera l'instance du store dans tous les composants enfants

        });
        /****************** END VUE-JS *******************/

    });
})(jQuery, Drupal)
