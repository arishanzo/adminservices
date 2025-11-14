<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Services\ServiceClient;
use Illuminate\Http\Request;

class ServiceCommunicationController extends Controller
{
    private $serviceClient;

    public function __construct(ServiceClient $serviceClient)
    {
        $this->serviceClient = $serviceClient;
    }

   

     public function getAllPermintaanPenarikan(Request $request)
    {
        $result = $this->serviceClient->getPermintaanPenarikan();
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }


   
    public function crossServiceData(Request $request)
    {
        $userId = $request->input('user_id');
        $guruId = $request->input('guru_id');

        $responses = [];

        if ($userId) {
            $userResult = $this->serviceClient->getUserData($userId);
            $responses['user'] = $userResult['success'] ? $userResult['data'] : null;
        }

        if ($guruId) {
            $guruResult = $this->serviceClient->getGuruData($guruId);
            $responses['guru'] = $guruResult['success'] ? $guruResult['data'] : null;
        }

        return response()->json($responses);
    }
}