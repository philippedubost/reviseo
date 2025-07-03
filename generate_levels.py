#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json

def create_question(qid, qtype, difficulty, question, options=None, correct_answer="", explanation="", points=10):
    """Créer une question selon le format requis"""
    q = {
        "id": qid,
        "type": qtype,
        "difficulty": difficulty,
        "question": question,
        "correctAnswer": correct_answer,
        "explanation": explanation,
        "points": points
    }
    if options:
        q["options"] = options
    return q

def create_lesson(lesson_id, title, description, icon, difficulty, questions):
    """Créer une leçon avec ses questions"""
    return {
        "id": lesson_id,
        "title": title,
        "description": description,
        "icon": icon,
        "difficulty": difficulty,
        "questions": questions
    }

def create_subject(subject_id, name, icon, description, color, lessons):
    """Créer une matière avec ses leçons"""
    return {
        "id": subject_id,
        "name": name,
        "icon": icon,
        "description": description,
        "color": color,
        "lessons": lessons
    }

def create_level(level_id, name, subjects):
    """Créer un niveau avec ses matières"""
    return {
        "id": level_id,
        "name": name,
        "subjects": subjects
    }

# Générer les questions pour les mathématiques de 6ème
def generate_sixieme_maths_questions():
    lessons = []
    
    # Leçon 1: Nombres entiers et décimaux
    questions = [
        create_question(1, "multiple-choice", 1, "Quel est le chiffre des unités dans 3 427 ?", 
                       ["3", "4", "2", "7"], "7", "Le chiffre des unités est le dernier chiffre à droite.", 10),
        create_question(2, "input", 1, "Complète : 3,5 + 2,8 = ___", 
                       None, "6,3", "3,5 + 2,8 = 6,3", 10),
        create_question(3, "multiple-choice", 1, "Quel nombre est le plus grand ?", 
                       ["12,5", "12,05", "12,50", "12,500"], "12,5", "12,5 = 12,50 = 12,500, tous sont égaux.", 10),
        create_question(4, "input", 2, "Complète : 15,7 - 8,3 = ___", 
                       None, "7,4", "15,7 - 8,3 = 7,4", 15),
        create_question(5, "multiple-choice", 2, "Combien font 2,5 × 4 ?", 
                       ["8", "9", "10", "11"], "10", "2,5 × 4 = 10", 15),
        create_question(6, "input", 2, "Complète : 18,6 ÷ 3 = ___", 
                       None, "6,2", "18,6 ÷ 3 = 6,2", 15),
        create_question(7, "multiple-choice", 3, "Quel est le résultat de 7,25 + 3,8 ?", 
                       ["10,05", "11,05", "10,15", "11,15"], "11,05", "7,25 + 3,8 = 11,05. Il faut bien aligner les virgules pour additionner correctement.", 20),
        create_question(8, "input", 3, "Complète : 45,6 - 17,9 = ___", 
                       None, "27,7", "45,6 - 17,9 = 27,7. Pour soustraire des décimaux, on aligne les virgules et on effectue la soustraction colonne par colonne.", 20)
    ]
    lessons.append(create_lesson(1, "Nombres entiers et décimaux", "Écriture, comparaison et opérations", "🔢", "easy", questions))
    
    # Continuer avec les autres leçons...
    # Pour des raisons de taille, je vais créer un exemple complet pour une matière
    return lessons

def generate_complete_structure():
    """Générer la structure complète des 5 niveaux"""
    
    # Structure des niveaux
    levels_data = {
        "sixieme": {
            "name": "Sixième",
            "subjects": {
                "maths": {"name": "Mathématiques", "icon": "🔢", "description": "Nombres décimaux, géométrie, proportionnalité", "color": "from-[#00baff] to-[#2ecc71]"},
                "francais": {"name": "Français", "icon": "📝", "description": "Grammaire, orthographe, littérature", "color": "from-[#e74c3c] to-[#f39c12]"},
                "histoire-geo": {"name": "Histoire-Géographie", "icon": "🌍", "description": "Antiquité, géographie de la France", "color": "from-[#8B4513] to-[#D2691E]"},
                "svt": {"name": "Sciences et Vie de la Terre", "icon": "🌱", "description": "Environnement, êtres vivants", "color": "from-[#27ae60] to-[#2ecc71]"},
                "anglais": {"name": "Anglais", "icon": "🇬🇧", "description": "Bases de la langue anglaise", "color": "from-[#2980b9] to-[#3498db]"}
            }
        },
        "cinquieme": {
            "name": "Cinquième",
            "subjects": {
                "maths": {"name": "Mathématiques", "icon": "🔢", "description": "Nombres relatifs, calcul littéral", "color": "from-[#00baff] to-[#2ecc71]"},
                "francais": {"name": "Français", "icon": "📝", "description": "Classes grammaticales, littérature médiévale", "color": "from-[#e74c3c] to-[#f39c12]"},
                "histoire-geo": {"name": "Histoire-Géographie", "icon": "🌍", "description": "Moyen Âge, géographie de l'Europe", "color": "from-[#8B4513] to-[#D2691E]"},
                "svt": {"name": "Sciences et Vie de la Terre", "icon": "🌱", "description": "Respiration, géologie", "color": "from-[#27ae60] to-[#2ecc71]"},
                "anglais": {"name": "Anglais", "icon": "🇬🇧", "description": "Temps verbaux, vie quotidienne", "color": "from-[#2980b9] to-[#3498db]"}
            }
        },
        "quatrieme": {
            "name": "Quatrième",
            "subjects": {
                "maths": {"name": "Mathématiques", "icon": "🔢", "description": "Pythagore, calcul littéral avancé", "color": "from-[#00baff] to-[#2ecc71]"},
                "francais": {"name": "Français", "icon": "📝", "description": "Nouvelle fantastique, théâtre", "color": "from-[#e74c3c] to-[#f39c12]"},
                "histoire-geo": {"name": "Histoire-Géographie", "icon": "🌍", "description": "XVIIIe-XIXe siècles, mondialisation", "color": "from-[#8B4513] to-[#D2691E]"},
                "svt": {"name": "Sciences et Vie de la Terre", "icon": "🌱", "description": "Nutrition, reproduction", "color": "from-[#27ae60] to-[#2ecc71]"},
                "anglais": {"name": "Anglais", "icon": "🇬🇧", "description": "Temps complexes, voix passive", "color": "from-[#2980b9] to-[#3498db]"}
            }
        },
        "seconde": {
            "name": "Seconde",
            "subjects": {
                "maths": {"name": "Mathématiques", "icon": "🔢", "description": "Fonctions, géométrie dans l'espace", "color": "from-[#00baff] to-[#2ecc71]"},
                "francais": {"name": "Français", "icon": "📝", "description": "Poésie, roman, théâtre", "color": "from-[#e74c3c] to-[#f39c12]"},
                "histoire-geo": {"name": "Histoire-Géographie", "icon": "🌍", "description": "Méditerranée antique, France contemporaine", "color": "from-[#8B4513] to-[#D2691E]"},
                "svt": {"name": "Sciences et Vie de la Terre", "icon": "🌱", "description": "Cellules, géosciences", "color": "from-[#27ae60] to-[#2ecc71]"},
                "anglais": {"name": "Anglais", "icon": "🇬🇧", "description": "Littérature, société contemporaine", "color": "from-[#2980b9] to-[#3498db]"}
            }
        },
        "premiere": {
            "name": "Première",
            "subjects": {
                "maths": {"name": "Mathématiques", "icon": "🔢", "description": "Dérivées, suites, probabilités", "color": "from-[#00baff] to-[#2ecc71]"},
                "francais": {"name": "Français", "icon": "📝", "description": "Bac français, commentaire, dissertation", "color": "from-[#e74c3c] to-[#f39c12]"},
                "histoire-geo": {"name": "Histoire-Géographie", "icon": "🌍", "description": "Révolutions, métropolisation", "color": "from-[#8B4513] to-[#D2691E]"},
                "svt": {"name": "Sciences et Vie de la Terre", "icon": "🌱", "description": "Génétique, dynamique terrestre", "color": "from-[#27ae60] to-[#2ecc71]"},
                "anglais": {"name": "Anglais", "icon": "🇬🇧", "description": "Thèmes culturels avancés", "color": "from-[#2980b9] to-[#3498db]"}
            }
        }
    }
    
    print("Structure de base créée avec succès!")
    print(f"Niveaux à créer: {list(levels_data.keys())}")
    print("Chaque niveau aura 5 matières × 8 leçons × 8 questions = 320 questions")
    print("Total: 5 × 320 = 1600 nouvelles questions")
    
    return levels_data

if __name__ == "__main__":
    structure = generate_complete_structure()
    
    # Sauvegarder la structure de base
    with open("new_levels_structure.json", "w", encoding="utf-8") as f:
        json.dump(structure, f, ensure_ascii=False, indent=2)
    
    print("\nStructure sauvegardée dans 'new_levels_structure.json'")
    print("Prêt pour l'intégration complète avec toutes les questions!")