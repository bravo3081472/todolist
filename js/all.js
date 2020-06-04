Vue.component('list',{
	props: ['List-Data'],
	template: `
	<li class="list-group-item">
		<div class="d-flex">
			<div class="form-check">
				<input type="checkbox" class="form-check-input" :id="ListData.id" v-model="ListData.completed">
				<label class="form-check-label pl-3" :class="{'completed': ListData.completed}" :for="ListData.id">
					{{ ListData.title }}
				</label>
			</div>
			<button type="button" class="close ml-auto" @click="removeItem">
				<span>&times;</span>
			</button>
		</div>
	</li>
	`,
	methods: {
		removeItem: function() {
			this.$emit('event',this.ListData.id)
		}
	},
})

new Vue({
	el: '#app',
	data: {
		todoData: [],
		newTodo: '',
		visibility: 'all'
	},
	methods: {
		addTodoData: function() {
			const vm = this
			let ToDoValue = vm.newTodo.trim()
			let TimeStamp = Math.floor(Date.now())
			if(!ToDoValue){
				return alert('請輸入資料')
			}else {
				vm.todoData.push(
					{
						id: TimeStamp,
						title: ToDoValue,
						completed: false
					}
				)
			}
			vm.newTodo = ''
		},
		removeTodoData: function(id) {
			const vm = this
			let newIndex = vm.todoData.findIndex(function(item, index) {
				return id === item.id
			})
			console.log(newIndex)
			vm.todoData.splice(newIndex, 1)
		},
	},
	computed: {
		filteredTodo: function() {
			const vm = this
			if(vm.visibility === 'all'){
				return vm.todoData
			}else if(vm.visibility === 'active') {
				let newTodos = vm.todoData.filter(function(item) {
					return !item.completed
				})
				return newTodos
			}else if(vm.visibility === 'completed') {
				let newTodos = vm.todoData.filter(function(item) {
					return item.completed
				})
				return newTodos
			}
		},
		listColor: function() {
			const vm = this
			switch(vm.visibility){
				case 'all': {
					return 'list-all'
					break
				}
				case 'active': {
					return 'list-active'
					break
				}
				case 'completed': {
					return 'list-completed'
					break
				}
			}
		}
	}
})