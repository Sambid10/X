import {RAGChat, upstash} from "@upstash/rag-chat"
import { redis } from "./redis"

export const ragchat=new RAGChat({
    model:upstash("mistralai/Mistral-7B-Instruct-v0.2"),
    redis:redis
})