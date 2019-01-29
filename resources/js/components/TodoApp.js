import React,{Component} from 'react';
import ReactDOM from 'react-dom'

const RenderRows=(props)=>{
    return props.todos.map(todo =>{
        return(
            <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button className="btn btn-secondary"
                        onClick={()=>props.deleteTask(todo)}
                >完了</button></td>
            </tr>
        )
    })
}

export default class TodoApp extends Component {
    constructor(){
        super();
        this.state ={
            todos:[],
            todo:''
        }
    }
    componentDidMount(){
        axios
            .get('/api/get')
            .then((res) => {
                //todosを更新（描画がかかる）
                this.setState({
                    todos: res.data
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    //入力がされたら
    inputChange(event){
        switch(event.target.name){
            case 'todo':
                this.setState({
                    todo:event.target.value
                })
                break;
            default :
                break;
        }
    }
    //登録ボタンがクリックされたら
    addTodo(){
        //空だと弾く
        if(this.state.todo==''){
            return;
        }
        //入力値を投げる
        axios
            .post('api/add',{
                title:this.state.todo
            })
            .then((res)=>{
                //戻り値をtodosにセット
                this.setState({
                    todos:res.data,
                    todo:''
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }
    //完了ボタンがクリックされたら
    deleteTask(todo){
        axios
            .post('/api/del',{
                id:todo.id
            })
            .then((res)=>{
                this.setState({
                    todos:res.data
                })
            })
            .catch(error=>{
                console.log(errror);
            })
    }
    render(){
        return(
            <React.Fragment>
                {/*add form*/}
                <div className ="form-group mt-4">
                    <label htmlFor="todo">新規Todo</label>
                    <input type="text" className="form-control" 
                        name="todo" value={this.state.todo}
                        onChange={(e)=>this.inputChange(e)}/>
                </div>
                <button className="btn btn-primary" onClick={()=>this.addTodo()}>登録</button>
                {/*table*/}
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>タスク</th>
                            <th>完了</th>
                        </tr>
                    </thead>
                    <tbody>
                        <RenderRows
                            todos={this.state.todos}
                            deleteTask={this.deleteTask.bind(this)}
                        />
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<TodoApp/>,document.getElementById('todoApp'));