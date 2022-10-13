<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sentence extends Model
{
    use HasFactory;
	protected $fillable = ['id','uid','book_id','paragraph','word_start','word_end','channel_uid','editor_uid','content','strlen','status','create_time','modify_time','language'];
}
