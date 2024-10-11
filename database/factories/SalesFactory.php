<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sales>
 */
class SalesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medicine_id' => $this->faker->numberBetween(1, 10),
            'quantity' => $this->faker->numberBetween(1, 100),
            'total_price' => $this->faker->numberBetween(1, 100),
        ];
    }
}
