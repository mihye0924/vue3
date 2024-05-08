<template>
	<div v-if="loading">
		Loading...
	</div>
	<form v-else @submit.prevent="onSave">
		<div class="row">
			<div class="col-6">
				<div class="form-group mb-2">
					<Input 
						label="Subject" 
						v-model:subject="todo.subject" 
						:error="subjectError"
					/>
				</div> 
			</div>
			<div  v-if="editing" class="col-6"> 
				<div class="form-group mb-2">
					<label class="mb-2" for="">Status</label>
					<div>
							<button 
									type="button"
									class="btn"
									:class="todo.completed ? 'btn-success' : 'btn-danger'"
									@click="toggleTodoStatus"
							>
									{{todo.completed ? 'Completed' : 'InComplete'}}
							</button>
					</div>
				</div>
			</div>
			<div class="col-12"> 
				<div class="form-group mb-2">
					<label class="mb-2" for="">Body</label>
					<textarea
						class="form-control"
						v-model="todo.body"
						name=""
						id=""
						cols="30"
						rows="10"
					/>
			</div>
			</div>
		</div>
		<button 
			type="submit" 
			class="btn btn-primary"
			:disabled="!todoUpdated"
		>
			{{editing ? 'Update': 'Create'}}
		</button>
		<button
			class="btn btn-outline-dark mx-2"
			@click="moveTodoListPage"
		>
			Cancle
		</button>
	</form>
</template>

<script> 
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { computed, ref } from 'vue';
import _ from 'lodash' 
import { useToast } from '@/hooks/toast'
import Input from '@/components/Input' 
export default {
		components: {
			Input
		},
		props: {
			editing: {
				type: Boolean,
				default: false
			}
		},
		setup(props) { 
				const route = useRoute();
				const router = useRouter();
				const todo = ref({ subject: '', completed: false, body: '' });
				const originalTodo = ref(null);
				const loading = ref(false); 
				const { showToast, tostMessage, toastAlertType, triggerToast } = useToast();
				const id = route.params.id;
				const subjectError = ref('')
				const getTodo = async() => {
						loading.value = true;
						try {
								const res = await axios.get('todos/' + id)
								todo.value = { ...res.data }; 
								originalTodo.value = { ...res.data };
								loading.value = false;
						}catch(err){
								loading.value = false;
								triggerToast('Something went wrong', 'danger');  
						}
				}  
				if(props.editing){
						getTodo();
				}
				// _loadash, 주소값 동일한지 찾기
				const todoUpdated = computed(()=> {
						return !_.isEqual(todo.value, originalTodo.value)
				})
				const toggleTodoStatus = () => {
						todo.value.completed = !todo.value.completed;
				}
				const moveTodoListPage = () => {
						router.push({
								name: 'Todos'
						})
				}
				const onSave = async() => {
					subjectError.value = "";
					if(!todo.value.subject) {
						subjectError.value = 'Subject is required';
						return;
					}
					try {
						let res;
						const data = {
							subject: todo.value.subject,
							completed: todo.value.completed,
							body: todo.value.body
							}
						if(props.editing) {
							res = await axios.put('todos/' + id, data);
							originalTodo.value = { ...res.data } 
						} else {
							res = await axios.post('todos', data);
							todo.value.subject = "";
							todo.value.body = "";

							router.push({
								name: 'Todos'
							})
						}
						const message = 'Successfully '+ (props.editing ? 'Updated!': 'Created!');
						triggerToast(message);
					}catch(err){
						triggerToast('Something went wrong', 'danger');  
					}
				} 
				return { 
						todo,
						loading,
						toggleTodoStatus,
						moveTodoListPage,
						onSave,
						getTodo,
						toastAlertType,
						showToast,
						todoUpdated,
						tostMessage,
						subjectError,
				}
		}
}
</script>

 