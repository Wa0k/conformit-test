<?php

namespace App\Controller;

use JsonException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(
        #[Autowire('%env(default::APP_GRAFANA_BASE_URL)%')] ?string $grafanaBaseUrl = null,
        #[Autowire('%env(default::APP_GRAFANA_PANELS)%')] ?string $grafanaPanelsRaw = '[]'
    ): Response {
        $grafanaBaseUrl = $grafanaBaseUrl ? rtrim($grafanaBaseUrl, '/') : '';

        try {
            $grafanaPanels = $grafanaPanelsRaw ? json_decode($grafanaPanelsRaw, true, 512, JSON_THROW_ON_ERROR) : [];
        } catch (JsonException) {
            $grafanaPanels = [];
        }

        $normalizedPanels = array_map(static function (array $panel): array {
            return array_merge(
                [
                    'title' => 'Panel sans titre',
                    'description' => null,
                    'dashboardUid' => null,
                    'panelId' => null,
                    'orgId' => 1,
                    'theme' => 'light',
                    'refresh' => '30s',
                ],
                $panel,
            );
        }, $grafanaPanels);

        return $this->render('home/index.html.twig', [
            'grafana_base_url' => $grafanaBaseUrl,
            'panels' => $normalizedPanels,
        ]);
    }
}
