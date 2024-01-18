import http from "k6/http";
import { check } from "k6";
import { Counter, Rate } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Trend } from "k6/metrics";


export const options = {
vus: 1,
duration: "3s",
thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: [{threshold:'p(95) < 200', abortOnFail: true}],
    checks: ['rate > 0.99']
}

}

const chamadas = new Counter('quantidade_de_chamadas');
const myGauge = new Gauge('tempo_bloqueado');
const myRate = new Rate('taxa_raq_200');
const myTrend = new Trend('taxa_de_espera');

export default function () {
    const res = http.get('http://test.k6.io');
    check(res, {
        'status code é 200': (r) => r.status === 200
    })
    
    }