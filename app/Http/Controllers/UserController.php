<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserData(){
        $header = $data  = [];
        $file = fopen(storage_path('mock.txt'), 'r');
        if ($file  !== false)
        {
            while (!feof($file))
            { 
                $row = fgets($file);
                $row = str_replace("\n", "", $row); 
                if (!empty($header)){
                    $row = explode(",",$row);
                    if(count($row) === 6){
                        $data[] = array_combine($header, $row);  
                    }
                }else{
                    $header = explode(",",$row);
                }
            }
        }
        fclose($file);
        return response()->json([
            'users' => $data
        ]);
    }
}
