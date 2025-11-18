<?php

namespace App\Exceptions;

use Exception;

abstract class AbstractAppException extends Exception
{
    /**
     * Possible values: "emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"
     *
     * @var string
     */
    public $logLevel = 'error';

    protected $allowedLogLevels = [
        'emergency',
        'alert',
        'critical',
        'error',
        'warning',
        'notice',
        'info',
        'debug',
    ];

    /**
     * Possible values: "emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"
     *
     * @param string $level
     *
     * @return $this
     */
    final public function setLogLevel(string $level = 'error')
    {
        $this->logLevel = in_array($level, $this->allowedLogLevels) ? $level : 'error';

        return $this;
    }

    /**
     * @return array
     */
    abstract public function context();
}
