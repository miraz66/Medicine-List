<?php

namespace Database\Seeders;

use Database\Factories\MedicineFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MedicineFactory::times(300)->create();
    }
}
