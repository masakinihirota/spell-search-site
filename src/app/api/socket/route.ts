import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";
import { createServer } from "http";
import { addMessage, deleteMessage } from "@/lib/data-utils";
import { ChatMessage } from "@/types";

// Socket.ioサーバーのインスタンス
let io: any;

// アクティブなユーザーを追跡
const activeUsers = new Set<string>();

/**
 * Socket.ioサーバーを初期化する
 */
function initSocketServer() {
  if (io) return io;

  // HTTPサーバーを作成
  const httpServer = createServer();

  // Socket.ioサーバーを初期化
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // 接続イベントのハンドリング
  io.on("connection", (socket: any) => {
    console.log("新しいクライアントが接続しました:", socket.id);

    // ユーザー参加イベント
    socket.on("user:join", (username: string) => {
      console.log(`ユーザー ${username} が参加しました`);
      activeUsers.add(username);

      // 全クライアントにユーザー参加を通知
      io.emit("user:joined", {
        username,
        activeUsers: Array.from(activeUsers),
      });
    });

    // ユーザー退出イベント
    socket.on("user:leave", (username: string) => {
      console.log(`ユーザー ${username} が退出しました`);
      activeUsers.delete(username);

      // 全クライアントにユーザー退出を通知
      io.emit("user:left", { username, activeUsers: Array.from(activeUsers) });
    });

    // 新しいメッセージイベント
    socket.on(
      "message:new",
      async (messageData: Omit<ChatMessage, "id" | "timestamp">) => {
        try {
          // メッセージをデータベースに保存
          const newMessage = await addMessage(messageData);

          // 全クライアントに新しいメッセージを通知
          io.emit("message:received", newMessage);
        } catch (error) {
          console.error("メッセージの保存に失敗しました:", error);
          socket.emit("error", { message: "メッセージの保存に失敗しました" });
        }
      }
    );

    // メッセージ削除イベント
    socket.on("message:delete", async (messageId: string) => {
      try {
        // メッセージをデータベースから削除
        const success = await deleteMessage(messageId);

        if (success) {
          // 全クライアントにメッセージ削除を通知
          io.emit("message:deleted", { id: messageId });
        }
      } catch (error) {
        console.error("メッセージの削除に失敗しました:", error);
        socket.emit("error", { message: "メッセージの削除に失敗しました" });
      }
    });

    // 切断イベント
    socket.on("disconnect", () => {
      console.log("クライアントが切断しました:", socket.id);
    });
  });

  // HTTPサーバーを起動（ポート0はランダムな空きポートを使用）
  httpServer.listen(0);

  return io;
}

/**
 * Socket.ioサーバーのAPIエンドポイント
 * GET /api/socket
 */
export async function GET(request: NextRequest) {
  try {
    // Socket.ioサーバーを初期化
    initSocketServer();

    return NextResponse.json(
      { message: "Socket.ioサーバーが起動しています" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Socket.ioサーバーの初期化に失敗しました:", error);
    return NextResponse.json(
      { error: "Socket.ioサーバーの初期化に失敗しました" },
      { status: 500 }
    );
  }
}
