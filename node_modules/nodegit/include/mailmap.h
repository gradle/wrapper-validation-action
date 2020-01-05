// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITMAILMAP_H
#define GITMAILMAP_H
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

#include "../include/repository.h"
#include "../include/signature.h"
// Forward declaration.
struct git_mailmap {
};

using namespace node;
using namespace v8;

class GitMailmap;

struct GitMailmapTraits {
  typedef GitMailmap cppClass;
  typedef git_mailmap cType;

  static const bool isDuplicable = false;
  static void duplicate(git_mailmap **dest, git_mailmap *src) {
     Nan::ThrowError("duplicate called on GitMailmap which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_mailmap *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_mailmap_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitMailmap : public
  NodeGitWrapper<GitMailmapTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitMailmapTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                

  private:
    GitMailmap()
      : NodeGitWrapper<GitMailmapTraits>(
           "A new GitMailmap cannot be instantiated."
       )
    {}
    GitMailmap(git_mailmap *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitMailmapTraits>(raw, selfFreeing, owner)
    {}
    ~GitMailmap();
                                
    struct AddEntryBaton {
      int error_code;
      const git_error* error;
      git_mailmap * mm;
      const char * real_name;
      const char * real_email;
      const char * replace_name;
      const char * replace_email;
    };
    class AddEntryWorker : public Nan::AsyncWorker {
      public:
        AddEntryWorker(
            AddEntryBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddEntryWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddEntryBaton *baton;
    };

    static NAN_METHOD(AddEntry);

    struct FromBufferBaton {
      int error_code;
      const git_error* error;
      git_mailmap * out;
      const char * buf;
      size_t len;
    };
    class FromBufferWorker : public Nan::AsyncWorker {
      public:
        FromBufferWorker(
            FromBufferBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FromBufferWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FromBufferBaton *baton;
    };

    static NAN_METHOD(FromBuffer);

    struct FromRepositoryBaton {
      int error_code;
      const git_error* error;
      git_mailmap * out;
      git_repository * repo;
    };
    class FromRepositoryWorker : public Nan::AsyncWorker {
      public:
        FromRepositoryWorker(
            FromRepositoryBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FromRepositoryWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FromRepositoryBaton *baton;
    };

    static NAN_METHOD(FromRepository);

    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_mailmap * out;
    };
    class CreateWorker : public Nan::AsyncWorker {
      public:
        CreateWorker(
            CreateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateBaton *baton;
    };

    static NAN_METHOD(Create);

    struct ResolveBaton {
      int error_code;
      const git_error* error;
      const char * real_name;
      const char * real_email;
      const git_mailmap * mm;
      const char * name;
      const char * email;
    };
    class ResolveWorker : public Nan::AsyncWorker {
      public:
        ResolveWorker(
            ResolveBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ResolveWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ResolveBaton *baton;
    };

    static NAN_METHOD(Resolve);

    struct ResolveSignatureBaton {
      int error_code;
      const git_error* error;
      git_signature * out;
      const git_mailmap * mm;
      const git_signature * sig;
    };
    class ResolveSignatureWorker : public Nan::AsyncWorker {
      public:
        ResolveSignatureWorker(
            ResolveSignatureBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ResolveSignatureWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ResolveSignatureBaton *baton;
    };

    static NAN_METHOD(ResolveSignature);
};

#endif
