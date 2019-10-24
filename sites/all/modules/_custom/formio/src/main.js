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
                 document.querySelector('.formbuilder .formio-component-submit button').removeAttribute('disabled')
               })
             },
             onSubmit: function(event, e) {
                e.preventDefault()
                this.jsonFormDefinition = JSON.stringify(event)
                console.log(JSON.stringify(event) + " event schema")
                return true
             },
             renderForm: function () {
               Formio.createForm (
                 document.querySelector('#renderForm'),
                 {
                   components:[
                     {"label":"Nom","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"inputMask":"","allowMultipleMasks":false,"customClass":"","tabindex":"","hidden":false,"hideLabel":false,"showWordCount":false,"showCharCount":false,"mask":false,"autofocus":false,"disabled":false,"alwaysEnabled":false,"tableView":true,"multiple":false,"defaultValue":null,"inputFormat":"plain","protected":false,"dbIndex":false,"case":"","encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"pattern":"","customMessage":"","custom":"","customPrivate":false,"json":"","minLength":"","maxLength":"","strictDateValidation":false},"unique":false,"errorLabel":"","key":"nom","tags":"","properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"textfield","input":true,"persistent":true,"refreshOn":"","inputType":"text","id":"eqy8djo"},{"type":"button","label":"Submit","key":"submit","size":"md","block":false,"action":"submit","disableOnInvalid":true,"theme":"primary","input":true,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"refreshOn":"","redrawOn":"","tableView":false,"labelPosition":"top","description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","widget":{"type":"input"},"attributes":{},"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"strictDateValidation":false},"conditional":{"show":null,"when":null,"eq":""},"overlay":{"style":"","left":"","top":"","width":"","height":""},"allowCalculateOverride":false,"encrypted":false,"alwaysEnabled":false,"showCharCount":false,"showWordCount":false,"properties":{},"allowMultipleMasks":false,"leftIcon":"","rightIcon":"","dataGridLabel":true,"id":"eahybk"}
                   ]

                 }
               )
             }
           }

            // fournit le store avec l'option `store`.
            // cela injectera l'instance du store dans tous les composants enfants

        });
        /****************** END VUE-JS *******************/

    });
})(jQuery, Drupal)
