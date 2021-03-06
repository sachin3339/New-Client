
import { faDesktop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
    { id: 1, label: "Challenges", value: 60, color: "secondary", icon: faDesktop },
    { id: 2, label: "Assessment", value: 30, color: "primary", icon: faMobileAlt },
    { id: 3, label: "Projects", value: 20, color: "tertiary", icon: faTabletAlt }
];

const totalOrders = [
    { id: 1, value: [30, 67, 15, 97, 65, 55, 34], color: "primary" }
];

export {
    trafficShares,
    totalOrders
};