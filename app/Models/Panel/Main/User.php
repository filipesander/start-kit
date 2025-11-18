<?php

namespace App\Models\Panel\Main;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class User extends Authenticatable implements AuditableContract
{
    use Auditable, HasApiTokens, HasFactory, Notifiable;

    public const ROLE_NORMAL = 0;
    public const ROLE_DIRECTOR = 1;
    public const ROLE_ADMINISTRATOR = 2;
    public const ROLE_MANAGER = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'otp_secret',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'otp_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'otp_secret' => 'encrypted',
    ];

    protected $appends = [
        'gravatar',
    ];

    public function getGravatarAttribute()
    {
        $size = 120;
        $default = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQ8HImUbgLQfi_30TgcRiFHrYXjghBhb6U3nFobuo9igtx4miNOAZ15riWW-PadMszLo&usqp=CAU";

        return "https://www.gravatar.com/avatar/" . md5( strtolower( trim( $this->attributes['email'] ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }
}
