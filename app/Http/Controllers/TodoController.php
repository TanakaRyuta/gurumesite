<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    //getTodos
    public function getTodos(){
        $todos=Todo::all();
        return $todos;
    }
    //addTodo
    public function addTodo(Request $request)
    {
        $todo = new Todo;
        $todo->title=$request->title;
        $todo->save();
        $todos = Todo::all();
        return $todos;
    }
    //delTodo
    public function delTodo(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->delete();

        $todos= Todo::all();
        return $todos;

    }
}