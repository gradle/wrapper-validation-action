// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCONFIG_H
#define GITCONFIG_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/git_buf_converter.h"
#include "../include/buf.h"
#include "../include/config_entry.h"
#include "../include/transaction.h"
// Forward declaration.
struct git_config {
};

using namespace node;
using namespace v8;

class GitConfig;

struct GitConfigTraits {
  typedef GitConfig cppClass;
  typedef git_config cType;

  static const bool isDuplicable = false;
  static void duplicate(git_config **dest, git_config *src) {
     Nan::ThrowError("duplicate called on GitConfig which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_config *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_config_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitConfig : public
  NodeGitWrapper<GitConfigTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitConfigTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                                                             

  private:
    GitConfig()
      : NodeGitWrapper<GitConfigTraits>(
           "A new GitConfig cannot be instantiated."
       )
    {}
    GitConfig(git_config *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitConfigTraits>(raw, selfFreeing, owner)
    {}
    ~GitConfig();
                                                                                             
    static NAN_METHOD(DeleteEntry);

    static NAN_METHOD(DeleteMultivar);

    struct FindGlobalBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
    };
    class FindGlobalWorker : public Nan::AsyncWorker {
      public:
        FindGlobalWorker(
            FindGlobalBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindGlobalWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindGlobalBaton *baton;
    };

    static NAN_METHOD(FindGlobal);

    struct FindProgramdataBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
    };
    class FindProgramdataWorker : public Nan::AsyncWorker {
      public:
        FindProgramdataWorker(
            FindProgramdataBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindProgramdataWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindProgramdataBaton *baton;
    };

    static NAN_METHOD(FindProgramdata);

    struct FindSystemBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
    };
    class FindSystemWorker : public Nan::AsyncWorker {
      public:
        FindSystemWorker(
            FindSystemBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindSystemWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindSystemBaton *baton;
    };

    static NAN_METHOD(FindSystem);

    struct FindXdgBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
    };
    class FindXdgWorker : public Nan::AsyncWorker {
      public:
        FindXdgWorker(
            FindXdgBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindXdgWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindXdgBaton *baton;
    };

    static NAN_METHOD(FindXdg);

    struct GetBoolBaton {
      int error_code;
      const git_error* error;
      int * out;
      const git_config * cfg;
      const char * name;
    };
    class GetBoolWorker : public Nan::AsyncWorker {
      public:
        GetBoolWorker(
            GetBoolBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetBoolWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetBoolBaton *baton;
    };

    static NAN_METHOD(GetBool);

    struct GetEntryBaton {
      int error_code;
      const git_error* error;
      git_config_entry * out;
      const git_config * cfg;
      const char * name;
    };
    class GetEntryWorker : public Nan::AsyncWorker {
      public:
        GetEntryWorker(
            GetEntryBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetEntryWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetEntryBaton *baton;
    };

    static NAN_METHOD(GetEntry);

    struct GetInt32Baton {
      int error_code;
      const git_error* error;
      int32_t * out;
      const git_config * cfg;
      const char * name;
    };
    class GetInt32Worker : public Nan::AsyncWorker {
      public:
        GetInt32Worker(
            GetInt32Baton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetInt32Worker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetInt32Baton *baton;
    };

    static NAN_METHOD(GetInt32);

    struct GetInt64Baton {
      int error_code;
      const git_error* error;
      int64_t * out;
      const git_config * cfg;
      const char * name;
    };
    class GetInt64Worker : public Nan::AsyncWorker {
      public:
        GetInt64Worker(
            GetInt64Baton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetInt64Worker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetInt64Baton *baton;
    };

    static NAN_METHOD(GetInt64);

    struct GetPathBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      const git_config * cfg;
      const char * name;
    };
    class GetPathWorker : public Nan::AsyncWorker {
      public:
        GetPathWorker(
            GetPathBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetPathWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetPathBaton *baton;
    };

    static NAN_METHOD(GetPath);

    struct GetStringBufBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      const git_config * cfg;
      const char * name;
    };
    class GetStringBufWorker : public Nan::AsyncWorker {
      public:
        GetStringBufWorker(
            GetStringBufBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetStringBufWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetStringBufBaton *baton;
    };

    static NAN_METHOD(GetStringBuf);

    struct LockBaton {
      int error_code;
      const git_error* error;
      git_transaction * tx;
      git_config * cfg;
    };
    class LockWorker : public Nan::AsyncWorker {
      public:
        LockWorker(
            LockBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LockWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LockBaton *baton;
    };

    static NAN_METHOD(Lock);

    struct OpenDefaultBaton {
      int error_code;
      const git_error* error;
      git_config * out;
    };
    class OpenDefaultWorker : public Nan::AsyncWorker {
      public:
        OpenDefaultWorker(
            OpenDefaultBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~OpenDefaultWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        OpenDefaultBaton *baton;
    };

    static NAN_METHOD(OpenDefault);

    struct OpenOndiskBaton {
      int error_code;
      const git_error* error;
      git_config * out;
      const char * path;
    };
    class OpenOndiskWorker : public Nan::AsyncWorker {
      public:
        OpenOndiskWorker(
            OpenOndiskBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~OpenOndiskWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        OpenOndiskBaton *baton;
    };

    static NAN_METHOD(OpenOndisk);

    struct SetBoolBaton {
      int error_code;
      const git_error* error;
      git_config * cfg;
      const char * name;
      int value;
    };
    class SetBoolWorker : public Nan::AsyncWorker {
      public:
        SetBoolWorker(
            SetBoolBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetBoolWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetBoolBaton *baton;
    };

    static NAN_METHOD(SetBool);

    struct SetInt32Baton {
      int error_code;
      const git_error* error;
      git_config * cfg;
      const char * name;
      int32_t value;
    };
    class SetInt32Worker : public Nan::AsyncWorker {
      public:
        SetInt32Worker(
            SetInt32Baton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetInt32Worker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetInt32Baton *baton;
    };

    static NAN_METHOD(SetInt32);

    struct SetInt64Baton {
      int error_code;
      const git_error* error;
      git_config * cfg;
      const char * name;
      int64_t value;
    };
    class SetInt64Worker : public Nan::AsyncWorker {
      public:
        SetInt64Worker(
            SetInt64Baton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetInt64Worker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetInt64Baton *baton;
    };

    static NAN_METHOD(SetInt64);

    struct SetMultivarBaton {
      int error_code;
      const git_error* error;
      git_config * cfg;
      const char * name;
      const char * regexp;
      const char * value;
    };
    class SetMultivarWorker : public Nan::AsyncWorker {
      public:
        SetMultivarWorker(
            SetMultivarBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetMultivarWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetMultivarBaton *baton;
    };

    static NAN_METHOD(SetMultivar);

    struct SetStringBaton {
      int error_code;
      const git_error* error;
      git_config * cfg;
      const char * name;
      const char * value;
    };
    class SetStringWorker : public Nan::AsyncWorker {
      public:
        SetStringWorker(
            SetStringBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetStringWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetStringBaton *baton;
    };

    static NAN_METHOD(SetString);

    struct SnapshotBaton {
      int error_code;
      const git_error* error;
      git_config * out;
      git_config * config;
    };
    class SnapshotWorker : public Nan::AsyncWorker {
      public:
        SnapshotWorker(
            SnapshotBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SnapshotWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SnapshotBaton *baton;
    };

    static NAN_METHOD(Snapshot);
};

#endif
