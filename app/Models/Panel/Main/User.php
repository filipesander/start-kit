<?php

namespace App\Models\Panel\Main;

use App\Models\Traits\BelongsToCompany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class User extends Authenticatable implements AuditableContract
{
    use Auditable, HasApiTokens, HasFactory, Notifiable, BelongsToCompany;

    public const ROLE_NORMAL = 0;
    public const ROLE_DIRECTOR = 1;
    public const ROLE_ADMINISTRATOR = 2;
    public const ROLE_MANAGER = 3;
    public const ROLE_SUPERADMIN = 99;

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
        'company_id',
        'original_company_id',
        'role',
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

    public function companies()
    {
        return $this->belongsToMany(Company::class)
            ->withPivot('is_owner')
            ->withTimestamps();
    }

    public function ownedCompanies()
    {
        return $this->belongsToMany(Company::class)
            ->wherePivot('is_owner', true)
            ->withTimestamps();
    }

    public function isSuperAdmin()
    {
        return $this->role === self::ROLE_SUPERADMIN;
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function originalCompany()
    {
        return $this->belongsTo(Company::class, 'original_company_id');
    }

    public function groupsForCurrentCompany()
    {
        if (!$this->company_id) {
            return $this->groups();
        }

        return $this->groups()->where(function ($query) {
            $query->whereNull('groups.company_id')
                  ->orWhere('groups.company_id', $this->company_id);
        });
    }
}
