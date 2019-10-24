<?php
drupal_add_js(
    drupal_get_path('module', 'formio') . '/dist/main.bundle.js'
);
?>

<link rel="stylesheet" href="https://unpkg.com/formiojs@4.0.0/dist/formio.full.min.css">

<div id="formio">

    <template>

      <h1>formbuilder</h1>
      <formbuilder v-bind:form="form" v-on:submit="onSubmit(form)"></formbuilder>
      <div class="jsonStructure">
        {{ jsonFormDefinition }}
      </div>
      <div id="renderForm">
      </div>
    </template>

</div>
