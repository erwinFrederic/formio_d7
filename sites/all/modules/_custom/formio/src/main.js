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
          methods: {
             onSubmit: function(event) {
                this.jsonFormDefinition = JSON.stringify(event)
                console.log(JSON.stringify(event) + " event schema")
             }
           }

            // fournit le store avec l'option `store`.
            // cela injectera l'instance du store dans tous les composants enfants

        });
        /****************** END VUE-JS *******************/

    });
})(jQuery, Drupal)
