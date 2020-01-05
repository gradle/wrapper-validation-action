// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITREMOTECREATEOPTIONS_H
#define GITREMOTECREATEOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "reference_counter.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

  #include "../include/repository.h"
 
using namespace node;
using namespace v8;

class GitRemoteCreateOptions;

struct GitRemoteCreateOptionsTraits {
  typedef GitRemoteCreateOptions cppClass;
  typedef git_remote_create_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_remote_create_options **dest, git_remote_create_options *src) {
     Nan::ThrowError("duplicate called on GitRemoteCreateOptions which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_remote_create_options *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};
 class GitRemoteCreateOptions : public NodeGitWrapper<GitRemoteCreateOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitRemoteCreateOptionsTraits>;
  public:
    GitRemoteCreateOptions(git_remote_create_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

           
  private:
    GitRemoteCreateOptions();
    ~GitRemoteCreateOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

             Nan::Persistent<Object> repository;
  
        static NAN_GETTER(GetRepository);
        static NAN_SETTER(SetRepository);

   
        static NAN_GETTER(GetName);
        static NAN_SETTER(SetName);

   
        static NAN_GETTER(GetFetchspec);
        static NAN_SETTER(SetFetchspec);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

  };

#endif
