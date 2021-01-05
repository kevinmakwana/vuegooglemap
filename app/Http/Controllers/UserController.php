<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserData(User $user){
        $users = $user->getUserData();

        return response()->json([
            'users' => $users
        ]);
        
    }

    
}
