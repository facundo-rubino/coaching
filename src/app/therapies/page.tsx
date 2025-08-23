"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const therapies = [
  {
    id: "1",
    title: "Terapia Cognitivo-Conductual",
    shortDescription:
      "Un enfoque práctico para resolver problemas cambiando patrones de pensamiento y comportamiento.",
    longDescription:
      "La Terapia Cognitivo-Conductual (TCC) es un tratamiento psicológico a corto plazo que se centra en enseñar a los pacientes habilidades específicas para identificar y cambiar patrones de pensamiento y comportamiento negativos. Es eficaz para una amplia gama de problemas, incluyendo la depresión, la ansiedad y los trastornos alimentarios.",
  },
  {
    id: "2",
    title: "Coaching de Vida",
    shortDescription:
      "Asociación colaborativa para ayudarte a alcanzar tus metas personales y profesionales.",
    longDescription:
      "El Coaching de Vida es un proceso que te ayuda a cerrar la brecha entre dónde estás ahora y dónde quieres estar. A través de conversaciones guiadas y ejercicios, desarrollarás un plan de acción claro para alcanzar tus objetivos, superar obstáculos y crear una vida más plena y con propósito.",
  },
  {
    id: "3",
    title: "Mindfulness y Reducción de Estrés",
    shortDescription:
      "Aprende a vivir en el presente y a reducir el estrés a través de técnicas de meditación.",
    longDescription:
      "Este programa se basa en la Reducción del Estrés Basada en la Atención Plena (REBAP), un enfoque que utiliza la meditación de atención plena para ayudar a las personas a gestionar mejor el estrés, el dolor crónico y la enfermedad. Aprenderás a cultivar una mayor conciencia del momento presente, fomentando la calma y la claridad mental.",
  },
]

export default function TherapiesPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 min-h-screen">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Nuestras Terapias
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los caminos que ofrecemos para tu bienestar y crecimiento
            personal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies.map(therapy => (
            <Card
              key={therapy.id}
              className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  {therapy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {therapy.shortDescription}
                </CardDescription>
              </CardContent>
              <CardFooter>
           
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
