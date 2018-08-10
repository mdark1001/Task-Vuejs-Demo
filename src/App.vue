<template lang="pug">
  #app
    section.section
      .tile.is-ancestor
        .tile.is-4.is-vertical.is-parent
          .tile.is-child.box
            p.title(v-show="!edit_name") {{ name }}
            input.input.is-large(type="text", placeholder="Ingrese su nombre",v-show="edit_name",v-model="name")

            .button.is-small.is-primary.is-outlined(@click="editName",v-show="!edit_name") Editar
            .button.is-small.is-success.is-outlined(@click="editName",v-show="edit_name") Guardar
            form.result
              .field
                label.label Tarea
                .control
                  input.input(type='text', placeholder='Ingrese el nombre de la tarea',v-model="form.name_task")
                p.help Ingrese el nombre de la tarea
              .field
                label.label Descripción
                .control
                  input.input(type='text', placeholder='Ingrese el descripción de la tarea',v-model="form.descripcion_task")
                p.help Ingrese el descripción de la tarea
              .field
                label.label Tiempo
                .control
                  input.input(type='number', placeholder='Ingrese el tiempo de la tarea',v-model="form.time_task")
                p.help Ingrese el tiempo en
              .field.is-grouped.is-grouped-right
                p.control
                  a.button.is-primary(@click="addTaks")
                    | Guardar
                p.control
                  a.button.is-light(@click="resetForm")
                    | Cancelar

        .tile.is-parent
         .tile.is-child.box
           p.title Listado de tareas
           .box(style="margin:5px;",v-for="(task,index) in tasks")
              article.media
                .media-content
                  .content
                    p
                      strong {{ `#${index+1} ${task.name_task}` }}
                      small(style="margin-left:10px; ") {{ task.create_at }}
                      br
                      |{{ task.descripcion_task }}
                a.delete.is-medium.is-danger(@click="deleteTask(index)")
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.getTasks()
  },
  data () {
    return {
      name: 'Tareas de:',
      tasks: [],
      form: {
        name_task: '',
        time_task: 0,
        descripcion_task: '',
        create_at: ''
      },
      edit_name: false
    }
  },
  methods: {
    editName: function () {
      this.edit_name = !this.edit_name
    },
    addTaks: function () {
      this.form.create_at = new Date().toLocaleString()
      this.tasks.push(this.form)
      this.setTasks()
      this.getTasks()
      this.resetForm()
    },
    resetForm: function () {
      this.form.name_task = ''
      this.form.time_task = 0
      this.form.descripcion_task = ''
    },
    setTasks: function () {
      window.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    getTasks: function () {
      let task = window.localStorage.getItem('tasks')
      if (task) {
        this.tasks = JSON.parse(task)
      }
    },
    deleteTask: function (index) {
      console.log(this.tasks.indexOf(index))
      this.tasks.splice(index, 1)
      this.setTasks()
      this.getTasks()
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
  @import './scss/main.scss';
  .result{
    margin-top: 30px;
  }
</style>
