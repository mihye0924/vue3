<template> 
	<List :items="todos">
		<template #default="{ item, index }">
			<div 
				class="card-body p-2 d-flex align-items-center"
				@click="moveToPage(item.id)"
			>
				<div class="flex-grow-1">
					<input  
						class="mx-2"
						type="checkbox"  
						:checked="item.completed" 
						@change="toggleTodo(index, $event)"
						@click.stop 
					/>
					<span  
						:style="item.completed ? todoStyle :{}"
						:class="{ 'todo': item.completed }" 
					>
						{{item.subject}}
					</span>
				</div> 
				<div>
					<button 
						class="btn btn-danger btn-sm"
						@click.stop="openModal(item.id)"
						>
						Delete
					</button> 
				</div>
			</div>
		</template>
	</List>
	<teleport to="#modal">
		<Modal 
			v-if="showModal"
			@close="closeModal"
			@delete="deleteTodo"
		> 
			<template #title>
				Delete Todo!!!
			</template>
			<template #body>
				Are you sure you want to delete the todo?
			</template>
		</Modal>
	</teleport>
</template>

<script>
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { ref } from 'vue';
import List from '@/components/List.vue';
import { getCurrentInstance } from 'vue';
export default {
  components: { 
		List,
		Modal 
		},
	props: {
		todos: {
		type: Array,
		required: true
		}
	},
	emits: ['toggle-todo', 'delete-todo'],
	setup(){
		const { emit } = getCurrentInstance();
		const router = useRouter();
		const showModal = ref(false);
		const todoDeleteId = ref(null);
		const deleteTodo = () => {   
			emit('delete-todo', todoDeleteId.value);
			showModal.value = false;
			todoDeleteId.value = null;
		}
		const toggleTodo = (index, event) => {
			emit('toggle-todo', index, event.target.checked)
		}
		const openModal = (id) => {
			todoDeleteId.value = id;
			showModal.value = true;
		}
		const closeModal = () => {
			todoDeleteId.value = null;
      showModal.value = false;
    }

		const moveToPage = (id) => {
			router.push({
				name: 'Todo',
				params: {
					id: id
				}
			})
		}
		return {
			moveToPage,
			closeModal,
			openModal,
			deleteTodo,
			toggleTodo,
			showModal
		}
	}
}
</script>

<style>

</style>