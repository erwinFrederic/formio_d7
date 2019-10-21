import '../assets/css/vue-form-wizard.css' //'vue-form-wizard/dist/vue-form-wizard.min.css'
import '../assets/css/styles.css'

import 'es6-promise/auto'
import swal from 'sweetalert';
import Vue from 'vue'
import Vuex from 'vuex'
//import SkeletonCard from 'skeleton-card-vuejs'
import VueResource from 'vue-resource'
import VueFormWizard from 'vue-form-wizard'
import VueScrollTo from 'vue-scrollto'
import _ from 'lodash'
//import SkeletonCard from 'skeleton-card-vuejs'


import * as API from './api/apis.js'


(function ($) {
    $(document).ready(function () {

        Vue.use(Vuex)
        Vue.use(VueResource)
        Vue.use(VueFormWizard)
        Vue.use(VueScrollTo, {
            container: 'body', //#container
            duration: 500,
            easing: 'ease-in',
            offset: 0,
            force: true,
            cancelable: true,
            onStart: function (element) {
                // scrolling started
            },
            onDone: function (element) {
                // scrolling is done
            },
            onCancel: function () {
                // scrolling has been interrupted
            },
            x: false,
            y: true
        });
        //Vue.use(SkeletonCard)

        /****************** MIXINS *******************/
        var myMixin = {
            // INSTANCE LIFECYCLE HOOKS
            created: function () {
                moment.locale('fr')

                this.itemsSelected = _.cloneDeep(this.initialItemsSelected)

                // _.debounce est une fonction fournie par lodash pour limiter
                // la fréquence d'exécution d'une opération particulièrement
                // couteuse. Dans ce cas, nous voulons limiter la fréquence
                // d'accès à yesno.wtf/api, en attendant que l'utilisateur ait
                // complètement fini de taper avant de faire la requête ajax.
                // Pour en savoir plus sur la fonction `_.debounce` (et sa
                // cousine `_.throttle`), visitez :
                // https://lodash.com/docs#debounce
                this.debouncedPhoneNumberValidator = _.debounce(this.phoneNumberValidator, 500);
            },
            mounted: function () {
                /****************** AXIOS INIT *******************/
                //API.default.baseConfig('https://' + Drupal.settings.achat_pass.tmf_conf.ip + ':' + Drupal.settings.achat_pass.tmf_conf.port)
                //API.default.generateToken()
                /****************** END AXIOS CONFIG *******************/

                this.Console('mounted')
            },
            updated: function () {
                this.jqueryScripts()
                this.Console('updated')
            },
            destroyed: function () {
                this.Console('destroyed')
            },
            methods: {
                Console: function (log) {
                    //console.log("LIFECYCLE " + log);
                }
            }
        };
        /****************** END MIXINS *******************/


        /****************** DIRECTIVES *******************/
        // Quand la page se charge, cet élément prend le focus
        Vue.directive('focus', {
            // Quand l'élément lié est inséré dans le DOM...
            inserted: function (el) {
                // L'élément prend le focus
                el.focus()
            }
        }); // v-focus

        // Cela va attacher l’élément à 200px depuis le haut de la page.
        // (direction: 'left' in vue data) pour attcher à gauche
        Vue.directive('pin', {
            bind: function (el, binding, vnode) {
                el.style.position = 'fixed'
                var s = (binding.arg == 'left' ? 'left' : 'top')
                el.style[s] = binding.value + 'px'
            }
        }); // v-pin:[direction]="200"
        /****************** END DIRECTIVES *******************/


        /****************** COMPONENTS *******************/
        var PubComponent = {
            template: '<div class="wiz-pub text-center">\n' +
                '                            <div class="col-xs-12 col-md-12 o-desc">\n' +
                '                                <span>Rechargez à partir de l’application </span> <br>\n' +
                '                                <span class="bold">Orange et moi</span>\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="col-xs-12 col-md-12 o-app">\n' +
                '                                <img class="img-responsive" src="/sites/all/modules/_custom/achat_pass/assets/images/icone-orange-moi.png">\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div class="col-xs-12 col-md-12 o-links-app no-padding">\n' +
                '                                <div class="col-xs-12 col-md-12">\n' +
                '                                    <div class="app-open hidden-sm hidden-md hidden-lg">\n' +
                '                                        <a href="">\n' +
                '                                            <h1>Ouvrir Orange et moi</h1>\n' +
                '                                            <i class="arrow right"></i>\n' +
                '                                        </a>\n' +
                '                                    </div>\n' +
                '                                    <h5 class="bold">Téléchargez l’application <br class="hidden-xs"> sur le Store</h5>\n' +
                '                                    <div>\n' +
                '                                        <a href="http://goo.gl/q8n4pV">\n' +
                '                                            <img class="img-responsive"\n' +
                '                                                 src="/sites/all/modules/_custom/achat_pass/assets/images/app-store-logo.png">\n' +
                '                                        </a>\n' +
                '                                        <a href="http://goo.gl/v3YpD7">\n' +
                '                                            <img class="img-responsive"\n' +
                '                                                 src="/sites/all/modules/_custom/achat_pass/assets/images/google-play-badge.png">\n' +
                '                                        </a>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>'
        };

        var EligibilityComponent = {
            props: ['beneficiaire', 'editable'],
            data: function () {
                return {
                    updateMobile: false
                }
            },
            /*methods: {
                toggle: function(e){
                    if( !e.contains('checked') ) {
                        console.log('checked');
                    } else {
                        console.log('unchecked');
                    }
                }
            },*/
            template: '<div class="col-xs-12 col-md-12 eligibility-update-mobile">\n' +
                '                                        <div class="block block__card">\n' +
                '                                            <div class="row">\n' +
                '                                                <div class="col-xs-8 col-md-8">\n' +
                '                                                    <transition mode="out-in"\n' +
                '                                                        name="custom-classes-transition"\n' +
                '                                                        enter-active-class="animated tada"\n' +
                '                                                        leave-active-class="animated bounceOutRight">\n' +
                '                                                        <!--"slide-fade" "bounce"-->\n' +
                '\n' +
                '                                                        <p class="no-margin"\n' +
                '                                                           v-if="!updateMobile">\n' +
                '                                                            Bénéficiaire\n' +
                '                                                            <span class="bold">{{ beneficiaire }}</span>\n' +
                '                                                        </p>\n' +
                '\n' +
                '                                                        <div\n' +
                '                                                            v-else="updateMobile">\n' +
                '                                                            <input size="11" maxlength="11"\n' +
                '                                                                placeholder="je modifie le numéro mobile Orange"\n' +
                '                                                                type="tel"\n' +
                '                                                                id="edit-beneficiaire"\n' +
                '                                                                v-model="beneficiaire"\n' +
                '                                                                value="beneficiaire"\n' +
                '                                                                class="form-control form-text required edit-beneficiaire">\n' +
                '                                                        </div>\n' +
                '                                                    </transition>\n' +
                '                                                </div>\n' +
                '\n' +
                '                                                <div class="col-xs-4 col-md-4" v-if="editable">\n' +
                '                                                    <a class="bold orange-color"\n' +
                '                                                       @click.prevent="$emit(\'changetab\')">\n' +
                '                                                       <!--v-on:click.prevent="updateMobile = !updateMobile">-->' +
                '                                                        <!--<span>Modifier</span>-->' +
                '                                                        <div class="circle">\n' +
                '                                                             <img class="img-responsive"\n' +
                '                                                                   src="/sites/all/modules/_custom/achat_pass/assets/images/img-edit.png">\n' +
                '                                                        </div>' +
                '                                                    </a>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>'
        };

        var OffersComponent = {
            props: ['offer'],
            template: '<transition name="fade" tag="div" appear>' +
                '<div class="col-xs-12 col-md-6 block__card_offer" v-if="offer.visible">\n' +
                '                                            <a class="block block__card"\n' +
                '                                               v-on:click.prevent="$emit(\'setoffer\')">\n' +
                '                                                <div class="row">\n' +
                '                                                    <div class="col-xs-4 col-md-12 card__img">\n' +
                '                                                        <img v-show="offer.new" class="img-new-pass"\n' +
                '                                                             src="/sites/all/modules/_custom/achat_pass/assets/images/etiquette-nouveau.png">\n' +
                '                                                        <img class="img-responsive"\n' +
                '                                                             v-bind:src="\'/sites/all/modules/_custom/achat_pass/assets/images/\' + offer.image">\n' +
                '                                                        <img v-show="offer.illustration != \'\'" class="img-illustration hidden-xs"\n' +
                '                                                             v-bind:src="\'/sites/all/modules/_custom/achat_pass/assets/images/\' + offer.illustration">\n' +
                '                                                    </div>\n' +
                '                                                    <div class="col-xs-8 col-md-12 no-xs-padding-left">\n' +
                '                                                        <div class="pass-desc">\n' +
                '                                                            <div class="card__title">\n' +
                '                                                                {{ offer.title }}\n' +
                '                                                            </div>\n' +
                '                                                            <div v-show="offer.description" class="card__description">\n' +
                '                                                                {{ offer.description }}\n' +
                '                                                            </div>\n' +
                '                                                        </div>\n' +
                '\n' +
                '                                                        <div class="hidden-sm hidden-md hidden-lg"\n' +
                '                                                             v-show="offer.illustration != \'\'">\n' +
                '                                                            <img class="img-illustration"\n' +
                '                                                                 v-bind:src="\'/sites/all/modules/_custom/achat_pass/assets/images/\' + offer.illustration">\n' +
                '                                                        </div>\n' +
                '                                                    </div>\n' +
                '                                                </div>\n' +
                '                                            </a>\n' +
                '                                        </div>' +
                '</transition>'
        };

        var OfferCatalogComponent = {
            props: ['pass'],
            template: '#offer-catalog'
        };

        var SelectedCatalogComponent = {
            template: '#selected-pass',
        };

        var OfferSelectedComponent = {
            props: ['offerselected', 'editable'],
            template: '<div v-if="offerselected != null"\n' +
                '                                    class="col-xs-12 col-md-12 no-padding block__card_offer">\n' +
                '                                    <div class="block block__card">\n' +
                '                                        <div class="row">\n' +
                '                                            <div\n' +
                '                                                class="col-xs-4 col-md-4 no-padding-right card__img">\n' +
                '                                                <img v-bind:src="\'/sites/all/modules/_custom/achat_pass/assets/images/\' + offerselected.image"\n' +
                '                                                    class="img-responsive">\n' +
                '                                            </div>\n' +
                '                                            <div\n' +
                '                                                class="col-xs-8 col-md-8 no-padding">\n' +
                '                                                <div\n' +
                '                                                    class="col-xs-12 col-md-12 pass-desc">\n' +
                '                                                    <div\n' +
                '                                                        class="col-xs-12 col-md-12 no-padding-left">\n' +
                '                                                        <span class="pull-left">\n' +
                '                                                            Offre sélectionnée\n' +
                '                                                        </span>\n' +
                '\n' +
                '                                                        <a class="bold orange-color pull-right" v-if="editable"\n' +
                '                                                           @click="$emit(\'changetab\')">\n' +
                '                                                            <!--<span>Modifier</span>-->' +
                '                                                            <div class="circle">\n' +
                '                                                                 <img class="img-responsive"\n' +
                '                                                                      src="/sites/all/modules/_custom/achat_pass/assets/images/img-edit.png">\n' +
                '                                                            </div>' +
                '                                                        </a>\n' +
                '                                                    </div>\n' +
                '                                                    <div\n' +
                '                                                        class="card__title">\n' +
                '                                                        {{ offerselected.libelle }}\n' +
                '                                                    </div>\n' +
                '                                                    <div class="card__description">\n' +
                '                                                        {{ offerselected.description }}\n' +
                '                                                    </div>\n' +
                '                                                </div>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>'
        };

        var RenewalDateItemComponent = {
            props: ['pass'],
            data: function () {
                return {
                    active: false
                }
            },
            mounted: function () {
                switch (this.pass.renewal.type) {
                    case "select":
                        this.pass.productSpecification.productSpecCharacteristic[0].productSpecCharacteristicValue.some((option, index) => {
                            if (option.default) this.pass.renewal.value = option.value
                        });
                        break;
                    case "number":
                        this.pass.renewal.value = 1
                        break;
                    case "date":
                        this.pass.renewal.value = '08'
                        break;

                    default:
                        this.pass.renewal.value = 'votre choix'
                        break;
                }
            },
            methods: {
                setRenewalValue: function (value, event) {
                    //console.log('day selected', event.target)
                    /*$('.renewal-date .days li span').removeClass('active')
                    pass.renewal.value = value*/
                },
            },
            template: '<select v-if=" pass.renewal.type === \'select\' " v-model="pass.renewal.value">' +
                '    <option v-for="option in pass.productSpecification.productSpecCharacteristic[0].productSpecCharacteristicValue" :value="option.value">{{ option.value }}</option>' +
                '</select>' +
                '' +
                '<input type="number" v-else-if=" pass.renewal.type === \'number\' " v-model="pass.renewal.value">' +
                '' +
                '<div class="renewal-popover" v-else-if=" pass.renewal.type === \'date\' ">\n' +
                '        <span class="text-underline" data-toggle="popover" data-placement="top" style="cursor: pointer">\n' +
                '            tous les <span v-html="pass.renewal.value"></span> du mois\n' +
                '        </span>\n' +
                '        <div class="popup-content hide">\n' +
                '            <div class="renewal-date">\n' +
                '                <div class="month">\n' +
                '                    <span>\n' +
                '                        Votre forfait sera automatiquement renouvelé tous les mois à la date <br> choisie.\n' +
                '                    </span>\n' +
                '                </div>\n' +
                '\n' +
                '                <ul class="weekdays">\n' +
                '                    <li>L</li>\n' +
                '                    <li>M</li>\n' +
                '                    <li>M</li>\n' +
                '                    <li>J</li>\n' +
                '                    <li>V</li>\n' +
                '                    <li>S</li>\n' +
                '                    <li>D</li>\n' +
                '                </ul>\n' +
                '\n' +
                '                <ul class="days">\n' +
                '                    <li v-on:click.native="setRenewalValue(01, $event)">1</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(02, $event)">2</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(03, $event)">3</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(04, $event)">4</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(05, $event)">5</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(06, $event)">6</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(07, $event)">7</li>\n' +
                '                    <li class="active" v-on:click.native="setRenewalValue(08, $event)">8</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(09, $event)">9</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(10, $event)">10</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(11, $event)">11</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(12, $event)">12</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(13, $event)">13</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(14, $event)">14</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(15, $event)">15</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(16, $event)">16</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(17, $event)">17</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(18, $event)">18</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(19, $event)">19</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(20, $event)">20</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(21, $event)">21</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(22, $event)">22</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(23, $event)">23</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(24, $event)">24</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(25, $event)">25</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(26, $event)">26</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(27, $event)">27</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(28, $event)">28</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(29, $event)">29</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(30, $event)">30</li>\n' +
                '                    <li v-on:click.native="setRenewalValue(31, $event)">31</li>\n' +
                '                </ul>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>' +
                '' +
                '<input type="text" v-else v-model="pass.renewal.value">'
        };
        var RenewalDateComponent = {
            props: ['selectedpass'],
            components: {
                'renewal-item': RenewalDateItemComponent,
            },
            template: '<div class="col-xs-12 col-md-12 no-padding block__card_renewal"\n' +
                '                                    v-if="selectedpass.renewal.active">\n' +
                '                                    <div class="block block__card" v-bind:style=" { \'background-color\': selectedpass.color, \'min-height\': \'40px\' } ">\n' +
                '                                        <div class="text-align-center" v-show="selectedpass.renewal.configurable" style="color: #ffffff; margin-bottom: 15px;" v-html="selectedpass.productSpecification.productSpecCharacteristic[0].description"></div>\n' +
                '                                        <input type="checkbox" class="o-checkbox" id="idChk1" v-show="selectedpass.renewal.configurable" v-model="selectedpass.renewal.configurable" disabled> \n' +
                '                                        <label for="idChk1" style="color: #ffffff; font-size: 10px;">' +
                '                                             <span v-show="!selectedpass.renewal.configurable">Achat reconduit</span>' +
                '                                             <span v-show="selectedpass.renewal.configurable" v-html="selectedpass.productSpecification.productSpecCharacteristic[0].shortDescription">Reconduire l’achat</span>' +
                '                                        </label>' +
                '' +
                '                                        <div v-bind:class="{ \'black-color\': selectedpass.renewal.value, \'pull-right\': true }" style="color: #ffffff">\n' +
                '                                            <span v-show="!selectedpass.renewal.configurable" style="text-decoration: underline; position: relative; top: 4px;">chaque {{ selectedpass.renewal.period }}</span>\n' +
                '' +
                '                                            <div v-show="selectedpass.renewal.configurable" class="renewal-item"> ' +
                '                                                <renewal-item v-bind:pass="selectedpass"></renewal-item>' +
                '                                            </div>' +
                '' +
                '                                            <i v-if="!selectedpass.renewal.value" class="fa fa-calendar" style="color: #ffffff"></i>\n' +
                '                                            <i v-else class="fa fa-calendar" style="color: #000000"></i>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '      </div>'
        };

        var ItemsSelectedComponent = {
            props: ['selectedpass', 'renewable', 'editable'],
            components: {
                'renewal-date': RenewalDateComponent,
            },
            template: '<div class="col-xs-12 col-md-12 no-padding">' +
                '          <div class="col-xs-12 col-md-12 list-item list-item-selected"' +
                '               v-bind:style="\'background-color: \' + selectedpass.color">\n' +
                '                                            <div class="col-xs-3 col-md-3 no-padding">\n' +
                '                                                <img v-bind:src="\'/sites/all/modules/_custom/achat_pass/assets/images/\' + selectedpass.image" class="img-responsive">\n' +
                '                                            </div>\n' +
                '                                            <div class="col-xs-7 col-md-7 no-padding">\n' +
                '                                                <h4>\n' +
                '                                                    <span class="block">{{ selectedpass.name }}</span>\n' +
                '                                                    <span class="block bold">{{ selectedpass.price }} FCFA</span>\n' +
                '                                                </h4>\n' +
                '                                            </div>\n' +
                '                                            <div class="col-xs-2 col-md-2 no-padding" v-if="editable">\n' +
                '                                                <a class="orange-color" v-on:click.prevent="$emit(\'removepass\')">\n' +
                '                                                    <!--<span>Retirer</span>-->\n' +
                '                                                    <div class="circle">\n' +
                '                                                        <img class="img-responsive" src="/sites/all/modules/_custom/achat_pass/assets/images/cross-arrow.png">\n' +
                '                                                    </div>\n' +
                '                                                </a>\n' +
                '                                            </div>\n' +
                '          </div>' +
                '          <div v-if="renewable">' +
                '              <renewal-date ' +
                '                  v-bind:selectedpass="selectedpass">\n' +
                '              </renewal-date>' +
                '          </div>' +
                '      </div>'
        };

        var AnticipationDateComponent = {
            props: ['itemsselected'],
            template: '<div class="col-xs-12 col-md-12 no-padding block__card_anticipation"\n' +
                '                                    v-if="itemsselected.anticipation.active">\n' +
                '                                    <div class="block block__card">\n' +
                '                                        <input type="checkbox" v-model="itemsselected.anticipation.value">\n' +
                '                                        <span>Anticiper l’achat</span>\n' +
                '                                        <a v-bind:class="{ \'orange-color\': itemsselected.anticipation.value }">\n' +
                '                                            <span class="text-underline">{{ itemsselected.anticipation.date }}</span>\n' +
                '                                            <img\n' +
                '                                                v-if="!itemsselected.anticipation.value"\n' +
                '                                                src="/sites/all/modules/_custom/achat_pass/assets/images/calendar-day.png"\n' +
                '                                                class="img-responsive">\n' +
                '                                            <img v-else\n' +
                '                                                 src="/sites/all/modules/_custom/achat_pass/assets/images/calendar-day-orange.png"\n' +
                '                                                 class="img-responsive">\n' +
                '                                        </a>\n' +
                '                                    </div>\n' +
                '                                </div>'
        };
        /****************** END COMPONENTS *******************/


        /****************** VUEX *******************/
        const store = new Vuex.Store({
            state: {
                count: 0,
            },
            mutations: {
                increment(state) {
                    state.count++
                },
                decrement: state => state.count--
            },
            strict: true
        });
        /****************** END VUEX *******************/


        /****************** VUE-JS *******************/
        var vm = new Vue({
            el: '#app-wizard',

            // fournit le store avec l'option `store`.
            // cela injectera l'instance du store dans tous les composants enfants.
            store,

            components: {
                'pub-content': PubComponent,
                'eligibility-update': EligibilityComponent,
                'all-offers': OffersComponent,
                //'offer-catalog': OfferCatalogComponent,
                'selected-pass-catalog': SelectedCatalogComponent,
                'offer-selected': OfferSelectedComponent,
                'items-selected': ItemsSelectedComponent,
                'anticipation-date': AnticipationDateComponent,
            },

            mixins: [myMixin],

            props: {
                title: {
                    type: String,
                    default: ''
                },
                subtitle: {
                    type: String,
                    default: ''
                },
                nextButtonText: {
                    type: String,
                    default: 'Next'
                },
                backButtonText: {
                    type: String,
                    default: 'Back'
                },
                finishButtonText: {
                    type: String,
                    default: 'Finish'
                },
                stepSize: {
                    type: String,
                    default: 'md',
                    validator: (value) => {
                        let acceptedValues = ['xs', 'sm', 'md', 'lg']
                        return acceptedValues.indexOf(value) !== -1;
                    }
                },
                /***
                 *  Sets validation (on/off) for back button. By default back
                 * button ignores validation
                 */
                validateOnBack: Boolean,
                /***
                 * Applies to text, border and circle
                 */
                color: {
                    type: String,
                    default: '#e74c3c' //circle, border and text color
                },
                /***
                 *  Is set to current step and text when beforeChange function
                 * fails
                 */
                errorColor: {
                    type: String,
                    default: '#8b0000'
                },
                /**
                 * Can take one of the following values: 'circle|square|tab`
                 */
                shape: {
                    type: String,
                    default: 'circle' // square; tab;
                },
                /**
                 * name of the transition when transition between steps
                 */
                transition: {
                    type: String,
                    default: '' //name of the transition when transition
                                // between steps
                },
                /***
                 * Index of the initial tab to display
                 */
                startIndex: {
                    type: Number,
                    default: 0
                },
                /***
                 * Icon name for the upper circle corresponding to the tab
                 * Supports themify icons only for now.
                 */
                icon: {
                    type: String,
                    default: ''
                },
                /***
                 * Function to execute before tab switch. Return value must be
                 * boolean If the return result is false, tab switch is
                 * restricted
                 */
                beforeChange: {
                    type: Function
                },

            },

            data: {
                // for encryption
                matrix: 'OCI_SelfC@reS2019',
                userConcerned: Drupal.settings.achat_pass.tmf_conf.User,
                encrypted: '',
                shield: {},
                cryptobject : {},
                // Wizard
                loadingWizard: false,
                errorMsg: null,

                beneficiaire: Drupal.settings.achat_pass.tmf_conf.User.replace(/\B(?=(\d{2})+(?!\d))/g, " "),
                userInitiator: null,
                // userConcerned: null,
                offers: [
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_MY_ILLIMIX',
                        libelle: 'NOVAMIX',
                        image: 'illustration-pass-novamix.png',
                        title: 'Novamix',
                        description: 'Package Appels, SMS, Data',
                        illustration: '',
                        new: true
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_DATA_N_V',
                        libelle: 'INTERNET',
                        image: 'illustration-pass-internet.png',
                        title: 'Pass Internet',
                        description: 'Forfaits Jour, Semaine et Mois',
                        illustration: '',
                        new: false
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_DATA_SV',
                        libelle: 'SOCIAL',
                        image: 'illustration-ps.png',
                        title: 'Pass Réseaux Sociaux',
                        description: 'Whatsapp, Facebook, Instagram',
                        illustration: '',
                        new: false
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_TOGO_TOGO',
                        libelle: 'TOGO TOGO',
                        image: 'illustration-togo.png',
                        title: 'Togo Togo',
                        description: 'Forfaits prépayés valables 24H',
                        illustration: '',
                        new: false
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_ILLIMIX',
                        libelle: 'ILLIMIX',
                        image: 'illustration-pass-international.png',
                        title: 'Pass Illimix',
                        description: 'Minutes utilisables à l’international',
                        illustration: 'logo-pass-international.png',
                        new: false
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_TV',
                        libelle: "TV d'ORANGE",
                        image: 'illustration-pass-tv.png',
                        title: 'Pass TV',
                        description: 'A profiter sur tous vos supports TV',
                        illustration: 'logo-pass-tv.png',
                        new: true
                    },
                    {
                        visible: true,
                        id: 'CAT_OPTIONS_PASS_CONV_DATA',
                        libelle: "Conversion",
                        image: 'illustration-pass-tv.png',
                        title: 'Pass de Conversion',
                        description: 'Echangez votre crédit, vos data ou vos SMS.',
                        illustration: '',
                        new: false
                    },
                ],
                offerSelected: null,
                baseOfferCatalog: [
                    {
                        id: "PASS SOCIAL 1",
                        added: false,
                        color: "#F766C3",
                        description: "Vous serez débité  de 50 F et bénéficierez de 100Mo pour Facebook, Instagram, Twitter, WhatsApp, Dailymotion et YouTube. Ce Pass est valable 1 jour, non cumulable. Et aujourd'hui seulement dans Orange et moi bénéficiez de 100% de bonus intra Orange valable 7 jours.",
                        image: "icon-pass-1-jour.png",
                        isBundle: false,
                        libelle: "Pass Social Mini",
                        name: "Pass Social Mini",
                        period: "1-Jour",
                        price: 50,
                        shortDescription: "Pass Social Mini",
                        type: "Jour",
                        validity: "24H",
                        renewal: {
                            active: false,
                            period: "chaque jour",
                            value: false,
                        },
                        category: [
                            {
                                id: "CAT_OPTIONS_DATA_SV",
                                name: "Pass social"
                            },
                            {
                                id: "CAT_OPTIONS",
                                name: "Options"
                            }
                        ],
                        productSpecification: {
                            description: "Vous serez débité  de 50 F et bénéficierez de 100Mo pour Facebook, Instagram, Twitter, WhatsApp, Dailymotion et YouTube. Ce Pass est valable 1 jour, non cumulable. Et aujourd'hui seulement dans Orange et moi bénéficiez de 100% de bonus intra Orange valable 7 jours.",
                            id: "PASS_SOCIAL_MINI_D",
                            name: "Pass Social Mini",
                            productSpecCharacteristic: [
                                {
                                    configurable: false,
                                    description: "Volume Réseaux sociaux",
                                    name: "volume_reseaux_sociaux",
                                    productSpecCharacteristicValue: [
                                        {
                                            unitOfMeasure: "Mo",
                                            value: "100",
                                            valueType: "number",
                                        }
                                    ],
                                    shortDescription: "Volume Réseaux sociaux",
                                },
                                {
                                    configurable: false,
                                    description: "Volume Normal",
                                    name: "volume_normal",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Volume Normal"
                                },
                                {
                                    configurable: false,
                                    description: "Bonus Normal",
                                    name: "bonus_normal",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Bonus Normal"
                                },
                                {
                                    configurable: false,
                                    description: "Volume Nuit",
                                    name: "volume_nuit",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Volume Nuit"
                                },
                                {
                                    configurable: false,
                                    description: "Bonus Nuit",
                                    name: "bonus_nuit",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Bonus Nuit"
                                },
                                {
                                    configurable: false,
                                    description: "Validité du pass",
                                    name: "valid",
                                    productSpecCharacteristicValue: [
                                        {
                                            unitOfMeasure: "Jour",
                                            value: "1",
                                            valueType: "number",
                                        }
                                    ],
                                    shortDescription: "Validité du pass"
                                },
                            ]
                        },
                        productOfferingPrice: [
                            {
                                priceType: "Operation",
                                price: {
                                    currencyCode: "FCFA",
                                    taxIncludedAmount: 50
                                }
                            }
                        ]
                    },
                    {
                        id: "PASS SOCIAL 2",
                        added: false,
                        color: "#F766C3",
                        description: "Vous serez débité  de 200 F et bénéficierez de 500Mo pour Facebook, Instagram, Twitter, WhatsApp, Dailymotion et YouTube. Ce Pass est valable 1 jour, non cumulable.Et aujourd'hui seulement dans Orange et moi bénéficiez de 100% de bonus intra Orange valable 7 jours.",
                        image: "icon-pass-1-jour.png",
                        isBundle: false,
                        libelle: "Pass Social Lite",
                        name: "Pass Social Lite",
                        period: "1-Jour",
                        price: 200,
                        shortDescription: "Pass Social Lite",
                        type: "Jour",
                        validity: "24H",
                        renewal: {
                            active: false,
                            period: "chaque jour",
                            value: false,
                        },
                        category: [
                            {
                                id: "CAT_OPTIONS_DATA_SV",
                                name: "Pass social"
                            },
                            {
                                id: "CAT_OPTIONS",
                                name: "Options"
                            }
                        ],
                        productSpecification: {
                            description: "Vous serez débité  de 50 F et bénéficierez de 100Mo pour Facebook, Instagram, Twitter, WhatsApp, Dailymotion et YouTube. Ce Pass est valable 1 jour, non cumulable. Et aujourd'hui seulement dans Orange et moi bénéficiez de 100% de bonus intra Orange valable 7 jours.",
                            id: "PASS_SOCIAL_MINI_D",
                            name: "Pass Social Mini",
                            productSpecCharacteristic: [
                                {
                                    configurable: false,
                                    description: "Volume Réseaux sociaux",
                                    name: "volume_reseaux_sociaux",
                                    productSpecCharacteristicValue: [
                                        {
                                            unitOfMeasure: "Mo",
                                            value: "100",
                                            valueType: "number",
                                        }
                                    ],
                                    shortDescription: "Volume Réseaux sociaux",
                                },
                                {
                                    configurable: false,
                                    description: "Volume Normal",
                                    name: "volume_normal",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Volume Normal"
                                },
                                {
                                    configurable: false,
                                    description: "Bonus Normal",
                                    name: "bonus_normal",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Bonus Normal"
                                },
                                {
                                    configurable: false,
                                    description: "Volume Nuit",
                                    name: "volume_nuit",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Volume Nuit"
                                },
                                {
                                    configurable: false,
                                    description: "Bonus Nuit",
                                    name: "bonus_nuit",
                                    productSpecCharacteristicValue: [
                                        {
                                            value: "-",
                                            valueType: "number"
                                        }
                                    ],
                                    shortDescription: "Bonus Nuit"
                                },
                                {
                                    configurable: false,
                                    description: "Validité du pass",
                                    name: "valid",
                                    productSpecCharacteristicValue: [
                                        {
                                            unitOfMeasure: "Jour",
                                            value: "1",
                                            valueType: "number",
                                        }
                                    ],
                                    shortDescription: "Validité du pass"
                                },
                            ]
                        },
                        productOfferingPrice: [
                            {
                                priceType: "Operation",
                                price: {
                                    currencyCode: "FCFA",
                                    taxIncludedAmount: 50
                                }
                            }
                        ]
                    },
                    {
                        "id": "PASS-my-illimix-114-weekly",
                        "name": "Pass Mix 2500f",
                        "image": "pass-icon.png",
                        "shortDescription": "Renouvellement Semaine auto",
                        "description": "Nouveau ! Renouvelez automatiquement votre pass Mix 2500F et bénéficiez de l'illimité vers vos numéros préférés, 225 minutes d'appels dont 75 minutes tous réseaux, 250 SMS tous réseaux et 1,2Go valables 7 jours non cumulable.",
                        "isBundle": false,
                        added: false,
                        color: "#F787C3",
                        period: "7-jours",
                        price: 2500,
                        type: "Semaine",
                        validity: "7 jours",
                        renewal: {
                            active: true,
                            configurable: true,
                            type: 'date',
                            period: "chaque semaine",
                            value: '',
                        },
                        "productSpecification": {
                            "id": "PASS-my-illimix-114-weekly",
                            "name": "Pass Mix 2500f",
                            "description": "Nouveau ! Renouvelez automatiquement votre pass Mix 2500F et bénéficiez de l'illimité vers vos numéros préférés, 225 minutes d'appels dont 75 minutes tous réseaux, 250 SMS tous réseaux et 1,2Go valables 7 jours non cumulable.",
                            "productSpecCharacteristic": [
                                {
                                    "name": "RENEWAL_WEEK_DAY",
                                    "description": "Sélectionnez le jour de la semaine pour le renouvellement",
                                    "shortDescription": "Jour de renouvellement",
                                    "valueType": "select",
                                    "configurable": true,
                                    "productSpecCharacteristicValue": [
                                        {
                                            "valueType": "option",
                                            "value": "Lundi",
                                            "default": true
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Mardi",
                                            "default": false
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Mercredi",
                                            "default": false
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Jeudi",
                                            "default": false
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Vendredi",
                                            "default": false
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Samedi",
                                            "default": false
                                        },
                                        {
                                            "valueType": "option",
                                            "value": "Dimanche",
                                            "default": false
                                        }
                                    ]
                                }
                            ]
                        },
                        "category": [
                            {
                                "id": "CAT_OPTIONS_MY_ILLIMIX_MIX_RENEWAL",
                                "name": "Renouvellement automatique de pass"
                            },
                            {
                                "id": "CAT_OPTIONS_MY_ILLIMIX",
                                "name": "Pass My Illimix"
                            },
                            {
                                "id": "CAT_OPTIONS",
                                "name": "Options"
                            }
                        ],
                        "productOfferingPrice": [
                            {
                                "name": "Pass Mix 2500f",
                                "description": "Renouvellement Semaine auto",
                                "priceType": "Recurring",
                                "recurringChargePeriod": "1 week",
                                "price": {
                                    "taxIncludedAmount": 2500.0,
                                    "currencyCode": "FCFA"
                                },
                                "productOfferPriceAlteration": {
                                    "priceType": "Recurring",
                                    "recurringChargePeriod": "1 week"
                                }
                            }
                        ]
                    },
                ],
                offerCatalog: null,
                initialItemsSelected: {
                    contentEditable: null,
                    items: [],
                    renewal: {active: false, label: 'Recurring', period: 'chaque jour', value: false},
                    anticipation: {active: false, date: 'tous les 08 du mois', value: false},
                    blockOtherItems: {active: true, value: false},
                    totalAmount: 0,
                    paymentDate: null
                },
                itemsSelected: null,
                mainBalance: {
                    airtime: 0,
                    om: 0,
                },
                OMMethod: null,
                OTPmaxDigit: 4,
                OTPCode: '',

                // API data
                datas: null,

                debugMode: true,
            },

            filters: {
                capitalize: function (value) {
                    if (!value) return ''
                    value = value.toString()
                    return value.charAt(0).toUpperCase() + value.slice(1)
                }
            },

            computed: {
                // un accesseur (getter) calculé
                /*OTPCode: {
                    // accesseur
                    get: function () {
                        return this.firstName + ' ' + this.lastName
                    },
                    // mutateur
                    set: function (newValue) {
                        var names = newValue.split(' ')
                        this.firstName = names[0]
                        this.lastName = names[names.length - 1]
                    }
                },*/
            },

            watch: {
                beneficiaire: function (val, event) {
                    var number = val.replace(/ /g, ''); //_.replace('Hi Fred', 'Fred', 'Barney');
                    this.beneficiaire = number.replace(/\B(?=(\d{2})+(?!\d))/g, " ")
                    this.debouncedPhoneNumberValidator()
                },
            },

            methods: {
                encryption: function() {
                   // cryptobject = CryptoJS.AES.encrypt(this.userConcerned, this.matrix);
                   console.log (Drupal.settings.achat_pass.tmf_conf.User)
                   console.log (vm.userConcerned)
                   var cryptobject = CryptoJS.AES.encrypt(JSON.stringify(Drupal.settings.achat_pass.tmf_conf.User), this.matrix, {format: CryptoJSAesJson}).toString();
                   console.log (this.userConcerned)
                   console.log(this.matrix)
                   console.log (cryptobject + '')
                   this.encrypted = cryptobject + ''
                   /* this.shield = {
                       	key: cryptobject.key + '', // don't send this
                        iv: cryptobject.iv + '', // don't send this
                        salt: cryptobject.salt + '', // don't send this
                        ciphertext: cryptobject.ciphertext + '', // don't send this
                        str: cryptobject + '' // send or store this
                    } */
                    this.shield = cryptobject

                   return this.encrypted
                },
                increment() {
                    store.commit('increment')
                    console.log(store.state.count)
                },
                decrement() {
                    store.commit('decrement')
                    console.log(store.state.count)
                },

                jqueryScripts: function () {
                    $('.edit-beneficiaire').keypress(function (event) {
                        return (event.charCode >= 48 && event.charCode <= 57);
                    });

                    // STICKY JS
                    $(window).bind('resize', function (e) {
                        resiseAffix();
                    });
                    $(window).on("scroll", function () {
                        resiseAffix();
                    });

                    function resiseAffix() {
                        $(".affix").css('width', $('.affix').closest('div.col-xs-12.col-md-4').width());

                        // Distance from top of document to top of footer.
                        var topOfFooter = $('#mosse-footer').position().top;
                        // Distance user has scrolled from top, adjusted to take in height of sidebar (570 pixels inc. padding).
                        var scrollDistanceFromTopOfDoc = $(document).scrollTop() + 800;
                        // Difference between the two.
                        var scrollDistanceFromTopOfFooter = scrollDistanceFromTopOfDoc - topOfFooter;

                        // If user has scrolled further than footer,
                        // pull sidebar up using a negative margin.
                        if (scrollDistanceFromTopOfDoc > topOfFooter) {
                            $('.affix').css({'margin-top': (0 - scrollDistanceFromTopOfFooter)});
                        } else {
                            $('.affix').css({'margin-top': 0});
                        }
                    }

                    // Bootstrap collapse customization
                    $('body').click(function (e) {
                        if ($('.myillimix-collapsed').is(':visible')) {
                            if (!$(e.target).is('.myillimix-collapsed')) {
                                $('.myillimix-collapsed').removeClass('in');
                                /*$('.myillimix-collapsed').collapse('hide');
                                $('.myillimix-collapsed').collapse({
                                    toggle: false
                                });*/
                            }
                        }
                    });

                    // Bootstrap popover customization
                    if ($('[data-toggle="popover"]').is(':visible')) {
                        $(function () {
                            $('[data-toggle="popover"]').popover(
                                {
                                    animation: true,
                                    delay: {"show": 300, "hide": 100},
                                    container: 'body',
                                    html: true,
                                    //title : '<button type="button" class="close" onclick="$(&quot;.popup-window&quot;).popover(&quot;hide&quot;);">&times;</button>',
                                    //placement: 'right',
                                    trigger: 'click',
                                    content: function () {
                                        return $(this).next('.popup-content').html();
                                    }
                                }
                            )
                        });
                        /*$('body').on('click', function (e) {
                            if ($( '.popover-content' ).is( ':visible' )) {
                                if (! $(e.target).is('.popover')) {
                                    $( '[data-toggle="popover"]' ).popover('hide');
                                }
                            }
                        });*/
                    }

                    // Script for TOGO TOGO
                    if (
                        $('#pass-togo-togo').hasClass('items-pass-togo-togo') ||
                        $('.togo-togo-range').is(':visible')
                    ) {
                        var getTotalTogoPass = function () {
                            $.removeCookie('panier');
                            $.cookie.json = true;

                            var panier = {
                                'numero': '',
                                'details': [],
                                'total': []
                            };

                            var total = 0;
                            var validity = 0;
                            $('.togo-togo-range input[type="range"]').each(function (index) {
                                var amount = typeof($(this).val()) === 'undefined' ? 0 : eval($(this).val());
                                total += amount;

                                // Calcul of validity for unique pass
                                /*if (validity < 3 && amount > 0) {
                                    validity++;
                                    $('#validity-togo-total').html(validity);
                                }*/

                                // Set Composition Pass togo-togo
                                panier['numero'] = $(this).attr("numero");
                                panier['details'][index] = {
                                    code: $(this).attr("id"),
                                    libelle: $(this).attr("name"),
                                    amount: amount,
                                    value: (amount / $(this).attr("step"))
                                };
                            });

                            /* $('#amount-togo-total').html(total);
                            if (total === 0) {
                                $('#validity-togo-total').html(0);
                            } */
                            $('#amount-togo-total').html(total);
                            // Calcul of validity for each choice of 100
                            if (total === 0) {
                                $('#validity-togo-total').html(0);
                            } else if (total === 300 || total > 300) {
                                $('#validity-togo-total').html(3);
                            } else {
                                $('#validity-togo-total').html(Math.floor(total / 100));
                            }

                            // Adding total Composition Pass togo-togo
                            panier['total'] = {
                                totalAmount: total,
                                totalValidity: validity
                            };

                            // Putting panier into cookie
                            //$.cookie('panier', panier); // { domain: '.mydomain.com' }
                            //console.log($.cookie('panier'));

                            // Putting panier into drupal variables
                            $.ajax({
                                type: 'POST',
                                url: '/pass-togo-togo/get/panier',
                                //dataType: 'json',
                                data: {panier: JSON.stringify(panier)},
                                success: function (result) {
                                    //console.log(result);
                                },
                                error: function () {
                                    //console.log('ko');
                                }
                            });

                        };

                        var getTotalTogoPassMobile = function () {
                            var panier = {
                                'numero': '',
                                'details': [],
                                'total': []
                            };

                            var total = 0;
                            var validity = 0;
                            $('.slidecontainer').each(function (index) {
                                var amount = typeof(eval($(this).find('.ui-slider-handle').attr("aria-valuenow"))) === 'undefined' ? 0 : eval($(this).find('.ui-slider-handle').attr("aria-valuenow"));
                                total += amount;

                                // Calcul of validity for unique pass
                                /*if (validity < 3 && amount > 0) {
                                    validity++;
                                    $('#validity-togo-total').html(validity);
                                }*/

                                // Set Composition Pass togo-togo
                                panier['numero'] = $(this).attr("numero");
                                panier['details'][index] = {
                                    code: $(this).attr("id"),
                                    libelle: $(this).attr("name"),
                                    amount: amount,
                                    value: (amount / 100)
                                };
                            });

                            /* $('#amount-togo-total').html(total);
                            if (total === 0) {
                                $('#validity-togo-total').html(0);
                            } */

                            $('#amount-togo-total').html(total);
                            // Calcul of validity for each choice of 100
                            if (total === 0) {
                                $('#validity-togo-total').html(0);
                            } else if (total === 300 || total > 300) {
                                $('#validity-togo-total').html(3);
                            } else {
                                $('#validity-togo-total').html(Math.floor(total / 100));
                            }

                            // Adding total Composition Pass togo-togo
                            panier['total'] = {
                                totalAmount: total,
                                totalValidity: validity
                            };

                            // Putting panier into cookie
                            //$.cookie('panier', panier); // { domain: '.mydomain.com' }
                            //console.log($.cookie('panier'));

                            // Putting panier into drupal variables
                            $.ajax({
                                type: 'POST',
                                url: '/pass-togo-togo/get/panier',
                                //dataType: 'json',
                                data: {panier: JSON.stringify(panier)},
                                success: function (result) {
                                    //console.log(result);
                                },
                                error: function () {
                                    //console.log('ko');
                                }
                            });

                        };


                        $('.togo-togo-range .block').each(function (index) {
                            var mainElement = $(this);
                            var passAmount = mainElement.find('.pass-togo-togo-amount');

                            if (
                                $('#pass-togo-togo').hasClass('items-pass-togo-togo') ||
                                $('.items-pass-togo-togo').is(':visible')
                            ) {
                                var sliderElement = $(this).find('.slider');

                                passAmount.html(typeof(sliderElement.val()) === 'undefined' ? 0 : sliderElement.val() + ' F CFA');
                                getTotalTogoPass();

                                sliderElement.change(function () {
                                    passAmount.html(typeof($(this).val()) === 'undefined' ? 0 : eval($(this).val()) + ' F CFA');
                                    getTotalTogoPass();
                                });
                            }

                            if (
                                $('.togo-togo-range').is(':visible')
                            ) {
                                /*var deviceAgent = navigator.userAgent.toLowerCase();
                                var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
                                if (agentID)
                                {
                                    if ( $.cookie('my_cookie_name') == undefined )
                                    {
                                        $.cookie( 'my_cookie_name', 'true', { expires: 30 });
                                        if ( confirm( "You're on an mobile device, you should download our app." ) ) {
                                            window.location = 'https://itunes.apple.com/....';
                                        }
                                    }
                                }*/

                                var sliderMobile = $(this).find('.ui-slider-handle');

                                passAmount.html(typeof(sliderMobile.attr("aria-valuenow")) === 'undefined' ? 0 : sliderMobile.attr("aria-valuenow") + ' F CFA');
                                getTotalTogoPassMobile();

                                mainElement.find('.slider-mobile').on('slidestop', function (event) {
                                    passAmount.html(typeof(sliderMobile.attr("aria-valuenow")) === 'undefined' ? 0 : sliderMobile.attr("aria-valuenow") + ' F CFA');
                                    getTotalTogoPassMobile();
                                });
                            }


                        });
                    }
                },

                /***************** Wizard *****************/
                PrevTab: function () {
                    this.$refs.wizard.prevTab()
                },
                NextTab: function () {
                    this.$refs.wizard.nextTab()
                },
                ChangeTab: function (oldIndex, newIndex) {
                    this.$refs.wizard.changeTab(this.$refs.wizard.activeTabIndex, newIndex)
                },
                setLoading: function (value) {
                    this.loadingWizard = value
                },
                handleValidation: function (isValid, tabIndex) {
                    //console.log('Tab: ' + tabIndex + ' valid: ' + isValid);
                },
                handleErrorMessage: function (errorMsg) {
                    this.errorMsg = errorMsg
                },
                handleChange: function (prevIndex, nextIndex) {
                    this.handleErrorMessage(null);

                    if (nextIndex === 3) {
                        this.OMMethod = null
                        this.itemsSelected.contentEditable = false
                    } else if (nextIndex === 1) {
                        this.offerSelected = null
                        this.offerCatalog = null
                        this.itemsSelected = _.cloneDeep(vm.initialItemsSelected)

                        this.itemsSelected.contentEditable = true
                    } else {
                        this.itemsSelected.contentEditable = true
                    }
                },
                /***************** / Wizard *****************/

                chooseRenewal: async function () {
                    var vm = this
                    vm.itemsSelected = _.cloneDeep(vm.initialItemsSelected)

                    swal("Vous voulez acheter ou renouveler un des pass " + vm.offerSelected.libelle + "?", {
                        buttons: {
                            //defeat: true,
                            cancel: "ACHETER",
                            catch: {
                                text: "RENOUVELER",
                                value: "catch",
                            },
                        },
                    })
                        .then((value) => {
                            switch (value) {
                                case "defeat":
                                    vm.itemsSelected.renewal.active = false
                                    swal("Pikachu fainted! You gained 500 XP!");
                                    break;

                                case "catch":
                                    vm.itemsSelected.renewal.active = true
                                    swal("Renouvellement choisi!", vm.offerSelected.title, "success");
                                    break;

                                default:
                                    vm.itemsSelected.renewal.active = false
                                    swal("Vous avez choisi d'acheter un des pass " + vm.offerSelected.libelle);
                                    break;
                            }
                        });
                },
                phoneNumberValidator: function () {
                    if (this.beneficiaire === '') {
                        this.handleErrorMessage("Veuillez saisir un numéro de téléphone orange s'il vous plaît");
                        this.$scrollTo('#alert-section')
                    } else if (this.beneficiaire.length !== 11) {
                        this.handleErrorMessage("Veuillez saisir un numéro de téléphone valide s'il vous plaît");
                        this.$scrollTo('#alert-section')
                    } else {
                        this.handleErrorMessage(null);
                    }
                },
                setItemsSelectedTotalAmount: function () {
                    var total = 0;
                    _.map(this.itemsSelected.items, function (el, key) {
                        total += el.price;
                    });
                    this.itemsSelected.totalAmount = total
                },
                shuffle: function () {
                    this.itemsSelected = _.shuffle(this.itemsSelected)
                },
                groupByCriteria: function (items, criteria) {
                    // Group all items by filter
                    var refined_data = _.chain(items).groupBy(criteria)
                        .map(function (group, criteria, collection) {
                            return {
                                criteria: criteria,
                                active: false,
                                illustration: _.get(_.find(group, 'image'), 'image'),
                                type: _.get(_.find(group, 'type'), 'type'),
                                validity: _.get(_.find(group, 'validity'), 'validity'),
                                items: _.map(group)
                            }
                        }).value();
                    //console.log('Classified Pass ', refined_data)

                    return refined_data
                },
                chunkItemsByValue: function (items, value) {
                    return _.chunk(items, value)
                },
                itemsFilteredByPriceType: function (items) {
                    return items.filter(function (item) {
                        var filter
                        if (vm.itemsSelected.renewal.active) {
                            filter = vm.itemsSelected.renewal.label.toLowerCase()
                        } else {
                            filter = 'operation'
                        }

                        //return !item.active;
                        if (
                            typeof item.productOfferingPrice !== "undefined" &&
                            item.productOfferingPrice.length &&
                            typeof item.productOfferingPrice[0].priceType !== "undefined"
                        )
                            return item.productOfferingPrice[0].priceType.toLowerCase() === filter
                    })
                },


                /***************** OTP CODE INPUTS *****************/
                onFocusEvent: function (index, event) {
                    for (var i = 1; i < this.OTPmaxDigit; i++) {
                        //const currentElement = document.getElementById('codeBox' + i);
                        const currentElement = document.getElementById('codeBox' + i);
                        /*if (!currentElement.value.length) {
                            currentElement.focus()
                            break;
                        }*/
                    }
                },
                onKeyUpEvent: function (index, event) {
                    if (event) {
                        const eventCode = event.which || event.keyCode

                        var code = '';
                        if (event.target.value.length === 1) {
                            event.target.blur()

                            // Get all code
                            for (var i = 1; i <= this.OTPmaxDigit; i++) {
                                //console.log( $("#codeBox" + i)[0].value )
                                code = code + '' + document.getElementById('codeBox' + i).value
                            }
                            this.OTPCode = (code.length === this.OTPmaxDigit) ? code : ''

                            if (index !== this.OTPmaxDigit) event.target.nextElementSibling.focus()
                        }

                        if (eventCode === 8) {
                            this.OTPCode = (code.length === this.OTPmaxDigit) ? code : ''

                            if (index !== 1) event.target.previousElementSibling.focus()
                        }
                    }
                },
                /***************** / OTP CODE EVENTS *****************/



                /***************** First step *****************/
                onReset: function () {
                    this.beneficiaire = '';
                },
                validateEligibility: function () {
                    var vm = this

                    return new Promise((resolve, reject) => {
                        if (this.beneficiaire === '') {
                            reject("Veuillez saisir un numéro de téléphone orange s'il vous plaît");
                            this.$scrollTo('#alert-section')
                        } else if (this.beneficiaire.length !== 11) {
                            reject("Veuillez saisir un numéro de téléphone valide s'il vous plaît");
                            this.$scrollTo('#alert-section')
                        } else {
                            if (Drupal.settings.achat_pass.tmf_conf.User !== '' && Drupal.settings.achat_pass.tmf_conf.User !== vm.beneficiaire.split(' ').join('')) {
                                this.userInitiator = Drupal.settings.achat_pass.tmf_conf.User.replace(/\B(?=(\d{2})+(?!\d))/g, " ")
                                this.userConcerned = vm.beneficiaire.split(' ').join('')
                            } else {
                                this.userInitiator = vm.beneficiaire
                                this.userConcerned = null
                            }

                            const checkOfferEligibility = async () => {
                                await API.default.productOfferingQualification(vm.beneficiaire.split(' ').join(''), 'CAT_OPTIONS_PASS')
                                    .then(function (data) {
                                        const groupOffers = _.chain(data.productOfferingQualificationItem).groupBy('category.id')
                                            .map(function (group, criteria, collection) {
                                                var result
                                                switch (criteria) {
                                                    case 'CAT_OPTIONS_MY_ILLIMIX':
                                                        result = {
                                                            image: 'illustration-pass-novamix.png',
                                                            illustration: '',
                                                            new: true,
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_DATA_N_V':
                                                        result = {
                                                            image: 'illustration-pass-internet.png',
                                                            illustration: '',
                                                            new: false
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_DATA_SV':
                                                        result = {
                                                            image: 'illustration-ps.png',
                                                            illustration: '',
                                                            new: false
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_TOGO_TOGO':
                                                        result = {
                                                            image: 'illustration-togo.png',
                                                            illustration: '',
                                                            new: false
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_ILLIMIX':
                                                        result = {
                                                            image: 'illustration-pass-international.png',
                                                            illustration: 'logo-pass-international.png',
                                                            new: false
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_TV':
                                                        result = {
                                                            image: 'illustration-pass-tv.png',
                                                            illustration: 'logo-pass-tv.png',
                                                            new: true
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_PASS_CONV_DATA':
                                                        result = {
                                                            image: 'illustration-pass-tv.png',
                                                            illustration: '',
                                                            new: false
                                                        }
                                                        break;
                                                    case 'CAT_OPTIONS_PASS_ROAM_INTER':
                                                        result = {
                                                            image: 'illustration-pass-international.png',
                                                            illustration: 'logo-pass-international.png',
                                                            new: false
                                                        }
                                                        break;

                                                    default:
                                                        result = {
                                                            image: 'default.png',
                                                            illustration: '',
                                                            new: true
                                                        }
                                                        break;
                                                }
                                                result['id'] = criteria
                                                result['visible'] = true
                                                result['title'] = _.get(_.find(group, 'category.name'), 'category.name')
                                                result['libelle'] = _.get(_.find(group, 'category.name'), 'category.name')
                                                result['description'] = null // _.get(_.find(group, 'category.description'), 'category.description')
                                                result['items'] = _.map(group)

                                                return result
                                            }).value();
                                        /*const groupOffers = _(data.productOfferingQualificationItem).groupBy('category.id')
                                            .reduce(function (result, value, key) {
                                                (result[value] || (result[value] = [])).push(key);
                                                return result;
                                            }, []);*/
                                        //console.log('Offers eligible', groupOffers)

                                        vm.offers = groupOffers
                                    })
                                    .catch(function (error) {
                                        if (vm.debugMode) reject(error)
                                        vm.$scrollTo('#alert-section')
                                    });
                            };
                            checkOfferEligibility()
                                .then(res => {
                                    setTimeout(function () {
                                        resolve(true);
                                    }, 2000);
                                })
                                .catch(error => {
                                    if (vm.debugMode) reject(error)
                                    vm.$scrollTo('#alert-section')
                                });
                        }
                    });
                },
                /***************** Second step *****************/
                setOffer: function (offer) {
                    this.offerSelected = offer

                    if (this.errorMsg == null) {
                        this.handleErrorMessage(null);
                        this.NextTab()
                    }
                },
                validateOfferSelection: function () {
                    return new Promise((resolve, reject) => {
                        if (this.beneficiaire === '') {
                            reject("Veuillez saisir un numéro de téléphone orange s'il vous plaît");
                            this.$scrollTo('#alert-section')
                        } else if (this.offerSelected == null) {
                            reject("Veuillez sélectionner une offre avant de continuer svp.");
                            this.$scrollTo('#alert-section')
                        } else {
                            var vm = this

                            const getRefinedData = async () => {
                                var allPass = []
                                // Get each pass from catalog
                                await _.forEach(vm.offerSelected.items, function (singlePass, key) {
                                    API.default.productCatalogManagement(singlePass.productOffering.id, null)
                                        .then(function (pass) {
                                            //console.log('PASS', pass)

                                            if (
                                                typeof pass.productSpecification !== "undefined" &&
                                                typeof pass.productSpecification.productSpecCharacteristic !== "undefined" &&
                                                pass.productSpecification.productSpecCharacteristic.length
                                            ) {
                                                vm.offerSelected['hasProductSpecCharacteristic'] = true

                                                var _period;
                                                var _illustration
                                                var _type
                                                var _validity
                                                pass.productSpecification.productSpecCharacteristic.some((v, i) => {
                                                    //return item.id == "qsdqs";
                                                    if (v.name === 'valid') {
                                                        _period = v.productSpecCharacteristicValue[0].value + '-' + _.toLower(v.productSpecCharacteristicValue[0].unitOfMeasure)
                                                        _illustration = 'icon-pass-' + _period + '.png'
                                                        //_type = _.capitalize(v.productSpecCharacteristicValue[0].unitOfMeasure)
                                                        _validity = v.productSpecCharacteristicValue[0].value + ' ' + _.toLower(v.productSpecCharacteristicValue[0].unitOfMeasure)
                                                        switch (_period) {
                                                            case '1-jour':
                                                                _type = '24H'
                                                                break
                                                            case '2-jours':
                                                                _type = '48H'
                                                                break
                                                            case '3-jours':
                                                                _type = '72H'
                                                                break
                                                            case '7-jours':
                                                                _type = 'Semaine'
                                                                break
                                                            case '30-jours':
                                                                _type = 'Mois'
                                                                break

                                                            default:
                                                                _type = 'Nuit'
                                                                _validity = 'la nuit'
                                                                break
                                                        }
                                                    }
                                                });

                                                pass['period'] = _period;
                                                pass['image'] = typeof _illustration !== "undefined" ? _illustration : 'pass-icon.png';
                                                pass['type'] = _type;
                                                pass['validity'] = _validity;
                                            } else {
                                                vm.offerSelected['hasProductSpecCharacteristic'] = false

                                                pass['image'] = 'pass-icon.png';
                                            }
                                            pass['color'] = "#" + (Math.random().toString(16) + "000000").slice(2, 8).toUpperCase().slice(-6);
                                            pass['category'] = singlePass.category.name; // encodeURIComponent()
                                            pass['added'] = false;

                                            if (
                                                typeof pass.productOfferingPrice !== "undefined" &&
                                                pass.productOfferingPrice.length &&
                                                typeof pass.productOfferingPrice[0].priceType !== "undefined"
                                            ) {
                                                pass['price'] = pass.productOfferingPrice[0].price.taxIncludedAmount;

                                                if (
                                                    typeof pass.productSpecification !== "undefined" &&
                                                    typeof pass.productSpecification.productSpecCharacteristic !== "undefined" &&
                                                    pass.productSpecification.productSpecCharacteristic.length &&
                                                    pass.productOfferingPrice[0].priceType === vm.itemsSelected.renewal.label
                                                ) {
                                                    pass['renewal'] = {
                                                        active: pass.productOfferingPrice[0].priceType === vm.itemsSelected.renewal.label,
                                                        configurable: pass.productSpecification.productSpecCharacteristic[0].configurable,
                                                        type: pass.productSpecification.productSpecCharacteristic[0].valueType,
                                                        period: (typeof pass.productOfferingPrice[0].recurringChargePeriod !== 'undefined') ? pass.productOfferingPrice[0].recurringChargePeriod : 'chaque ' + _.lowerCase(_type),
                                                        characteristicName: pass.productSpecification.productSpecCharacteristic[0].configurable ? pass.productSpecification.productSpecCharacteristic[0].name : null,
                                                        value: null
                                                    };
                                                } else {
                                                    pass['renewal'] = {
                                                        active: null,
                                                        configurable: null,
                                                        type: null,
                                                        period: null,
                                                        characteristicName: null,
                                                        value: null
                                                    };
                                                }
                                            }

                                            allPass.push(pass)
                                        })
                                        .catch(function (error) {
                                            if (vm.debugMode) reject(error)
                                            //vm.$scrollTo('#alert-section')
                                        });
                                });

                                //_.omit(allPass, ['a', 'c']);
                                return _.castArray(allPass)
                            };
                            getRefinedData()
                                .then(allPass => {
                                    //allPass = _.cloneDeep(vm.baseOfferCatalog)
                                    vm.offerCatalog = allPass
                                    //console.log('All PASS', vm.offerCatalog)

                                    setTimeout(function () {
                                        resolve(true);

                                        // TEST RENOUVELLEMENT
                                        /*const isRenewal = allPass.filter(function  (item) {
                                            if (
                                                typeof item.productOfferingPrice !== "undefined" &&
                                                item.productOfferingPrice.length &&
                                                typeof item.productOfferingPrice[0].priceType !== "undefined"
                                            )
                                                return item.productOfferingPrice[0].priceType.toLowerCase() === vm.itemsSelected.renewal.label.toLowerCase()
                                        });
                                        //console.log('isRenewal', isRenewal)
                                        if ( isRenewal.length ) vm.chooseRenewal()*/
                                    }, 4000);
                                })
                                .catch(error => {
                                    if (vm.debugMode) reject(error)
                                    vm.$scrollTo('#alert-section')
                                }).finally(function () {
                                // always executed
                            });
                        }
                    });
                },
                /***************** Third step *****************/
                addPass: function (index, item) {
                    //console.log('ITEM ADDED', item)
                    if (
                        !this.itemsSelected.blockOtherItems.active
                        && !this.itemsSelected.items.length
                    ) {
                        this.itemsSelected.items.push(item);
                        this.updatePass(index, item);
                    } else {
                        this.itemsSelected.items.push(item);
                        this.updatePass(index, item);
                    }

                    if (this.errorMsg != null)
                        this.handleErrorMessage(null);
                },
                updatePass: function (index, item) {
                    item.added = !item.added;
                    this.setItemsSelectedTotalAmount()

                    // Vue.set
                    //Vue.set(this.itemsSelected.items, index, item)
                    //vm.$set(vm.offerCatalog.items, index, item)
                },
                removePass: function (index, item) {
                    if (this.itemsSelected.items.length) {
                        var key;
                        var test = this.itemsSelected.items.some((value, index) => {
                            if (item.id === value.id)
                                key = index;
                            //return item.id == "qsdqs";
                        });

                        // Array.prototype.splice
                        //vm.items.splice(indexOfItem, 1, newValue)
                        //vm.itemsSelected.splice(index, 1);
                        this.itemsSelected.items.splice(key, 1);

                        this.updatePass(index, item);
                    }
                },
                validatePassSelection: function () {
                    var vm = this
                    return new Promise((resolve, reject) => {
                        if (this.beneficiaire === '') {
                            reject("Veuillez saisir un numéro de téléphone orange s'il vous plaît");
                            this.$scrollTo('#alert-section')
                        } else if (this.offerSelected == null) {
                            reject("Veuillez sélectionner une offre avant de continuer svp.");
                            this.$scrollTo('#alert-section')
                        } else if (!this.itemsSelected.items.length) {
                            reject("Veuillez sélectionner un pass avant de continuer svp.");
                            this.$scrollTo('#alert-section')
                        } else {
                            var airtimeBalance
                            var omBalance = 50000

                            API.default.usageCunsomptionReport(vm.userInitiator.split(' ').join(''))
                                .then(function (data) {
                                    if (typeof data[0].bucket !== "undefined" && data[0].bucket.length) {
                                        const getAirtimeBalance = async () => {
                                            await _.forEach(data[0].bucket, function (balance, key) {
                                                switch (balance.product.name) {
                                                    case 'Compte principal':
                                                        airtimeBalance = balance.bucketBalance[0].remainingValue !== null ? balance.bucketBalance[0].remainingValue : (balance.bucketCounter[2].value - balance.bucketCounter[0].value)
                                                        break;
                                                }
                                            });
                                            //console.log('Main Balance', airtimeBalance)
                                            vm.mainBalance.airtime = airtimeBalance
                                        };
                                        getAirtimeBalance()
                                            .then(allPass => {
                                                setTimeout(function () {
                                                    resolve(true);
                                                }, 2000);
                                            }).catch(error => {
                                            if (vm.debugMode) reject(error)
                                        });
                                    }

                                }).catch(function (error) {
                                if (vm.debugMode) reject(error)
                                vm.$scrollTo('#alert-section')
                            });

                            vm.mainBalance.om = omBalance
                        }
                    });
                },
                /***************** Fourth step *****************/
                setPaymentMethod: async function (value) {
                    this.OTPCode = ''
                    this.OMMethod = value
                    this.OTPmaxDigit = this.OMMethod ? 4 : 4

                    if (this.OMMethod === false) {
                        //Generate OTP code for Airtime
                        this.generateOTPCode()
                    }

                    this.handleErrorMessage(null)
                },
                generateOTPCode: function () {
                    this.setLoading(true)
                    var vm = this
                    const generateOTP = async () => {
                        await API.default.generateOTP(vm.userInitiator.split(' ').join(''))
                            .then(function (data) {
                                if (data.hasError === true) {
                                    vm.handleErrorMessage(data.status.message)
                                } else {
                                    vm.handleErrorMessage(null)
                                }
                                console.log (data);
                            }).catch(function (data) {
                                if (vm.debugMode) vm.handleErrorMessage(error)
                                vm.$scrollTo('#alert-section')
                            });
                    };
                    generateOTP()
                        .then(allPass => {
                            setTimeout(function () {
                                vm.setLoading(false)
                            }, 2000);
                        }).catch(error => {
                        if (vm.debugMode) vm.handleErrorMessage(error)
                        vm.$scrollTo('#alert-section')
                    });
                },
                validatePayment: function () {
                    var vm = this
                    return new Promise((resolve, reject) => {
                        if (vm.beneficiaire === '') {
                            reject("Veuillez saisir un numéro de téléphone orange s'il vous plaît");
                            vm.$scrollTo('#alert-section')
                        } else if (vm.offerSelected === null) {
                            reject("Veuillez sélectionner une offre avant de continuer svp.");
                            vm.$scrollTo('#alert-section')
                        } else if (!vm.itemsSelected.items) {
                            reject("Veuillez sélectionner un pass avant de continuer svp.");
                            vm.$scrollTo('#alert-section')
                        } else if (vm.OMMethod === null) {
                            reject("Veuillez sélectionner une méthode de paiment afin de pousuivre votre achat");
                            vm.$scrollTo('#alert-section')
                        } else if (vm.OTPCode === '') {
                            reject("Veuillez saisir le code OTP afin de terminer votre achat");
                            vm.$scrollTo('#alert-section')
                        } else {
                            if (vm.OMMethod === false) {
                                vm.setLoading(true)
                                //Check OTP code for Airtime
                                const validateUserOTP = async () => {
                                    await API.default.validateUserOTP(vm.userInitiator.split(' ').join(''), vm.OTPCode)
                                        .then(function (data) {
                                            if (typeof data !== 'undefined' && !data.hasError) {
                                                resolve(true)
                                            } else {
                                                var errorMsg
                                                if (typeof data !== 'undefined') {
                                                    errorMsg = vm.APIMessages(data.status.code)
                                                } else {
                                                    errorMsg = "Impossible de poursuivre l'action. Veuillez réessayer svp!"
                                                }
                                                reject(errorMsg) // data.status.message
                                            }
                                        }).catch(function (error) {
                                            if (vm.debugMode) reject(error)
                                            vm.$scrollTo('#alert-section')
                                        });
                                };
                                validateUserOTP()
                                    .then(allPass => {
                                        setTimeout(function () {
                                            vm.setLoading(false)
                                        }, 2000);
                                    }).catch(error => {
                                    if (vm.debugMode) vm.handleErrorMessage(error)
                                    vm.$scrollTo('#alert-section')
                                });
                            } else {
                                resolve(true)
                            }
                        }
                    });
                },
                onComplete: function () {
                    var vm = this

                    // Get all code
                    var code = '';
                    for (var i = 1; i <= vm.OTPmaxDigit; i++) {
                        code = code + '' + document.getElementById('codeBox' + i).value
                    }
                    vm.OTPCode = vm.OMMethod ? code : ''
                    console.log('OTPCode', this.OTPCode)

                    this.setLoading(true)
                    //Validate Payment
                    // Ordering the products

                    // vm.encryption(Drupal.settings.orange_offre.userConcerned)
                    console.log ('Before doing it');
                    const productOrdering = async () => {
                        await API.default.productOrdering('achat-pass', vm.itemsSelected, 'add', vm.userInitiator.split(' ').join(''), vm.userConcerned, vm.OTPCode, null, vm.encryption( vm.userConcerned ))
                            .then(function (data) {
                                if (typeof data !== 'undefined' && typeof data.state !== 'undefined' && data.state === 'completed') {
                                    vm.handleErrorMessage(null)

                                    // At the end
                                    vm.itemsSelected.paymentDate = 'Le ' + moment().format('Do MMMM YYYY à HH:mm:ss')
                                    $("#achatModal").modal()
                                } else {
                                    var errorMsg
                                    if (typeof data !== 'undefined') {
                                        errorMsg = vm.APIMessages(data.code)
                                    } else {
                                        errorMsg = "Impossible de poursuivre l'action. Veuillez réessayer svp!"
                                    }

                                    vm.handleErrorMessage(errorMsg) // data.message
                                    vm.$scrollTo('#alert-section')
                                }
                            }).catch(function (error) {
                                if (vm.debugMode) vm.handleErrorMessage(error)
                                vm.$scrollTo('#alert-section')
                            });
                    };
                    productOrdering()
                        .then(result => {
                            setTimeout(function () {
                                vm.setLoading(false)
                            }, 2000);
                        }).catch(error => {
                        if (vm.debugMode) vm.handleErrorMessage(error)
                        vm.$scrollTo('#alert-section')
                    });
                },

                APIMessages: function (code) {
                    var message
                    switch (code) {
                        case "902" :
                            message = "Le code d'autorisation reçu par SMS est invalide";
                            break;

                        case "920" :
                            message = "L'utilisateur existe déjà dans le système.";
                            break;

                        case "930" :
                            message = "Ce numéro n'est pas encore enregistré dans le systéme. Veuillez vous inscrire svp!";
                            break;

                        case "927" :
                            message = "Veuillez réessayer dans une minute svp!";
                            break;

                        case "928" :
                            message = "Désolé vous avez atteint le nombre de générations de code. Veuillez réessayer dans une heure svp!";
                            break;

                        case "929" :
                            message = 'Identifiant ou mot de passe incorrects.';
                            break;

                        case 'S-ACT-00112':
                            message = 'Votre crédit est insuffisant.';
                            break;

                        case 'BL-S-ACT-00146':
                            message = 'Votre crédit est insuffisant.';
                            break;

                        case 4106:
                            message = "Le code d'autorisation reçu par SMS est invalide";
                            break;

                        case 'Not sufficient balance.':
                            message = 'Votre crédit est insuffisant.';
                            break;

                        case 'BL-S-ACT-00152':
                            message = 'Votre compte est inactif.';
                            break;

                        default:
                            message = 'Une erreur est survenue. Veuillez réessayer svp!';
                            break;
                    }

                    return message
                },

            },

        });
        /****************** END VUE-JS *******************/

    });
})(jQuery, Drupal)
